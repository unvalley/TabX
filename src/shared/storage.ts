import { Mutex } from 'async-mutex'
import produce from 'immer'
import { browser } from 'webextension-polyfill-ts'
import { loadCache, saveCache } from './cache'
import { DOMAIN_TAB_LISTS, TAB_LISTS } from './constants'
import { createNewDomainTabList } from './list'
import { restoreTabs } from './tabAction'
import { DomainTabList, ListName, ListType, TabList, TabSimple } from './typings'
import { acquireMetadata } from './utils/api'
import { genParamsToFetchMetadata, zip } from './utils/util'

const mutex = new Mutex()

const get = (storageKey: string) => browser.storage.local.get(storageKey)
const set = (obj: Record<string, unknown>) => browser.storage.local.set(obj)

// ========================
// Storage Operations
// ========================

export const getAllLists = async <T extends ListName>(storageKey: T): Promise<ListType<T>[]> => {
  const cachedData = loadCache(storageKey)
  if (cachedData.length > 0) {
    return cachedData
  }
  const res = await get(storageKey).then(data =>
    Array.isArray(data[storageKey]) ? (data[storageKey] as ListType<T>[]) : [],
  )
  saveCache(storageKey, res)
  return res
}

export const setLists = (storageKey: ListName, lists: TabList[] | DomainTabList[]) => {
  saveCache(storageKey, [])
  return set({ [storageKey]: lists })
}

export const addList = async (storageKey: ListName, newList: TabList | DomainTabList) => {
  const allTabLists = await getAllLists(storageKey)
  const updatedAllTabLists = produce(allTabLists, draft => {
    draft.push(newList)
  })
  return setLists(storageKey, updatedAllTabLists)
}

export const addLists = async (storageKey: ListName, newLists: TabList[]) => {
  const allTabLists = await getAllLists(storageKey)
  const updatedAllTabLists = produce(allTabLists, draft => {
    return [...draft, ...newLists]
  })
  return setLists(storageKey, updatedAllTabLists)
}

export const deleteAllLists = (key: string) => set({ [key]: null })

type Domain = string
export const addDomainTabs = async (groupedNewList: [Domain, TabSimple[]][]) => {
  const release = await mutex.acquire()
  // SELECT
  try {
    const allDomainTabLists = await getAllLists(DOMAIN_TAB_LISTS)
    const domains = allDomainTabLists.map(list => list.domain)

    console.log('domains', domains)
    const updatedAllTabLists = await produce(allDomainTabLists, async draft => {
      draft.forEach(list => {
        groupedNewList.forEach(async newList => {
          const domain = newList[0]
          const domainTabList = newList[1]
          if (list.domain === domain) {
            // exisiting domain
            console.log('domain matches', list.domain, domain)
            list.tabs.push(...domainTabList)
          }
          if (!domains.includes(domain)) {
            console.log('domain not includes', domain)
            draft.push(createNewDomainTabList(domain, domainTabList))
            domains.push(domain)
          }
        })
      })
    })
    console.log('updateAllTabLists', updatedAllTabLists)
    setLists(DOMAIN_TAB_LISTS, updatedAllTabLists)
  } catch (err) {
    console.error(err)
  } finally {
    release()
  }
}

/**
 * Delete Single Tab Link in a TabList
 * @param id
 */
export const deleteTabLink = async (storageKey: ListName, tabListId: number, tabId: number) => {
  const release = await mutex.acquire()
  try {
    // SELECT
    const allTabLists = await getAllLists(storageKey)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const targetTabListElem = draft.filter(list => list.id === tabListId)[0]
      const idx = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter((_, i) => i !== idx)
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(storageKey, tabListId)
    })
    // UPDATE
    console.log('updateALlTabLists', updatedAllTabLists)
    setLists(storageKey, updatedAllTabLists)
  } catch (err) {
    console.error(err)
  } finally {
    release()
  }
}

/**
 * Delete TabList
 * @param tabListId
 */
export const deleteTabList = async (storageKey: ListName, tabListId: number) => {
  const release = await mutex.acquire()
  try {
    const allTabLists = await getAllLists(storageKey)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const listIdx = draft.findIndex(({ id }) => id === tabListId)
      draft.splice(listIdx, 1)
    })
    setLists(storageKey, updatedAllTabLists)
  } finally {
    release()
  }
}

export const pinnTabList = async (storageKey: ListName, tabListId: number) => {
  // SELECT
  const allTabLists = await getAllLists(storageKey)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(TAB_LISTS, allTabLists)
}

export const restoreTabList = async (storageKey: ListName, tabListId: number) => {
  // SELECT
  const allTabLists = await getAllLists(storageKey)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // OPEN
  await restoreTabs(targetTabListElem.tabs)
  // DELETE
  await deleteTabList(storageKey, tabListId)
}

// ========================
// Meta
// ========================

const mergeTabsWithMeta = async (tabs: TabSimple[]) => {
  const params = genParamsToFetchMetadata(tabs)
  const metaObjs = await acquireMetadata(params)

  const tabsWithMetas = []
  // NOTE: merge tabs and metaObjs
  for (const [tab, metaObj] of zip(tabs, metaObjs)) {
    tabsWithMetas.push({ ...tab, ...metaObj })
  }
  return tabsWithMetas
}

export const updateTabListElemWithMeta = async (tabListId: number) => {
  // SELECT
  const allTabLists = await getAllLists(TAB_LISTS)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // NOTE: prepare data for update
  const tabsWithMeta = await mergeTabsWithMeta(targetTabListElem.tabs)
  targetTabListElem.tabs = tabsWithMeta

  // UPDATE
  setLists(TAB_LISTS, allTabLists)
}

// const b = groupedNewList.map(newList => {
//   const domain = newList[0]
//   const domainTabList = newList[1]
//   if (!domains.includes(domain)) {
//     return addList(DOMAIN_TAB_LISTS, createNewDomainTabList(domain, domainTabList))
//   }
// })
// groupedNewList.forEach(async newList => {
//   const domain = newList[0]
//   const domainTabList = newList[1]
//   if (!domains.includes(domain)) {
//     // new domain
//     console.log('domains.not includes', domain)
//     await addList(DOMAIN_TAB_LISTS, createNewDomainTabList(domain, domainTabList))
//   }
// })
