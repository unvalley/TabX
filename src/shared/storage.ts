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

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: Record<string, unknown>) => browser.storage.local.set(obj)

// ========================
// Storage Operations
// ========================

export const getAllLists = async <T extends ListName>(key: T): Promise<ListType<T>[]> => {
  const cachedData = loadCache(key)
  if (cachedData.length > 0) {
    return cachedData
  }
  const res = await get(key).then(data => (Array.isArray(data[key]) ? (data[key] as ListType<T>[]) : []))
  saveCache(key, res)
  return res
}

export const setLists = (key: ListName, lists: TabList[] | DomainTabList[]) => {
  saveCache(key, [])
  return set({ [key]: lists })
}

export const addList = async (key: ListName, newList: TabList | DomainTabList) => {
  const allTabLists = await getAllLists(key)
  const updatedAllTabLists = produce(allTabLists, draft => {
    draft.push(newList)
  })
  return setLists(key, updatedAllTabLists)
}

export const addLists = async (key: ListName, newLists: TabList[]) => {
  const allTabLists = await getAllLists(key)
  const updatedAllTabLists = produce(allTabLists, draft => {
    return [...draft, ...newLists]
  })
  return setLists(key, updatedAllTabLists)
}

export const deleteAllLists = (key: string) => set({ [key]: null })

type Domain = string
export const addDomainTabs = async (groupedNewList: [Domain, TabSimple[]][]) => {
  const release = await mutex.acquire()
  // SELECT
  try {
    const allDomainTabLists = await getAllLists(DOMAIN_TAB_LISTS)
    const domains = allDomainTabLists.map(list => list.domain)

    const updatedAllTabLists = await produce(allDomainTabLists, async draft => {
      draft.forEach(list => {
        groupedNewList.forEach(async newList => {
          const domain = newList[0]
          const domainTabList = newList[1]
          if (list.domain === domain) {
            list.tabs.push(...domainTabList)
          }
          if (!domains.includes(domain)) {
            draft.push(createNewDomainTabList(domain, domainTabList))
            // update domains for considlering loop
            domains.push(domain)
          }
        })
      })
    })
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
export const deleteTabLink = async (key: ListName, tabListId: number, tabId: number) => {
  const release = await mutex.acquire()
  try {
    // SELECT
    const allTabLists = await getAllLists(key)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const targetTabListElem = draft.filter(list => list.id === tabListId)[0]
      const idx = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter((_, i) => i !== idx)
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(key, tabListId)
    })
    // UPDATE
    console.log('updateALlTabLists', updatedAllTabLists)
    setLists(key, updatedAllTabLists)
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
export const deleteTabList = async (key: ListName, tabListId: number) => {
  const release = await mutex.acquire()
  try {
    const allTabLists = await getAllLists(key)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const listIdx = draft.findIndex(({ id }) => id === tabListId)
      draft.splice(listIdx, 1)
    })
    setLists(key, updatedAllTabLists)
  } finally {
    release()
  }
}

export const pinnTabList = async (key: ListName, tabListId: number) => {
  // SELECT
  const allTabLists = await getAllLists(key)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(TAB_LISTS, allTabLists)
}

export const restoreTabList = async (key: ListName, tabListId: number) => {
  // SELECT
  const allTabLists = await getAllLists(key)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // OPEN
  await restoreTabs(targetTabListElem.tabs)
  // DELETE
  await deleteTabList(key, tabListId)
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
