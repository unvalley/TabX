import { Mutex } from 'async-mutex'
import produce from 'immer'
import { browser } from 'webextension-polyfill-ts'
import { cache, loadCache, saveCache } from './cache'
import { DOMAIN_TAB_LISTS, TAB_LISTS } from './constants'
import { restoreTabs } from './tabs'
import { DomainTabList, TabList, TabSimple } from './typings'
import { acquireMetadata } from './utils/api'
import { genParamsToFetchMetadata, zip } from './utils/util'

const mutex = new Mutex()

const get = (storageKey: string) => browser.storage.local.get(storageKey)
const set = (obj: Record<string, unknown>) => browser.storage.local.set(obj)

export const getAllTabLists = async (storageKey: string) => {
  const cachedData = loadCache(storageKey)
  if (cachedData.length > 0) {
    return cachedData
  }
  const allLists = await get(storageKey).then(({ val }) => (val as TabList[] | DomainTabList[]) || [])
  saveCache(storageKey, allLists)

  return allLists
}

export const setLists = (storageKey: string, lists: TabList[] | DomainTabList[]) => {
  const filterdLists = lists.filter(list => list.tabs)
  cache.tabLists = []
  return set({ [storageKey]: filterdLists })
}

export const addList = async (storageKey: string, newList: TabList) => {
  const allTabLists = await getAllTabLists(storageKey)
  const updatedAllTabLists = produce(allTabLists, draft => {
    draft.push(newList)
  })
  return setLists(storageKey, updatedAllTabLists)
}

export const addDomainTabs = async (groupedNewList: any[]) => {
  const allDomainTabLists = await getAllTabLists(DOMAIN_TAB_LISTS)
  const updatedAllTabLists = produce(allDomainTabLists, draft => {
    draft.forEach(list => {
      groupedNewList.forEach(async newList => {
        const domain = newList[0]
        if (list.domain === domain) {
          //   console.log(list.id, list.tabs, newList[1])
          list.tabs.push(newList[1])
        }
      })
    })
  })
  console.log(updatedAllTabLists)
  setLists(DOMAIN_TAB_LISTS, updatedAllTabLists)
}

export const deleteAllLists = (key: string) => set({ [key]: null })

/**
 * Delete Single Tab Link in a TabList
 * @param id
 */
export const deleteTabLink = async (tabListId: number, tabId: number) => {
  const release = await mutex.acquire()
  try {
    // SELECT
    const allTabLists = await getAllTabLists(TAB_LISTS)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const targetTabListElem = draft.filter(list => list.id === tabListId)[0]
      const idx = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter((_, i) => i !== idx)
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(tabListId)
    })
    // UPDATE
    setLists(TAB_LISTS, updatedAllTabLists)
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
export const deleteTabList = async (tabListId: number) => {
  const release = await mutex.acquire()
  try {
    const allTabLists = await getAllTabLists(TAB_LISTS)
    const updatedAllTabLists = produce(allTabLists, draft => {
      const listIdx = draft.findIndex(({ id }) => id === tabListId)
      draft.splice(listIdx, 1)
    })
    setLists(TAB_LISTS, updatedAllTabLists)
  } finally {
    release()
  }
}

export const pinnTabList = async (tabListId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists(TAB_LISTS)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(TAB_LISTS, allTabLists)
}

export const restoreTabList = async (tabListId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists(TAB_LISTS)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // OPEN
  await restoreTabs(targetTabListElem.tabs)
  // DELETE
  await deleteTabList(tabListId)
}

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
  const allTabLists = await getAllTabLists(TAB_LISTS)
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // NOTE: prepare data for update
  const tabsWithMeta = await mergeTabsWithMeta(targetTabListElem.tabs)
  targetTabListElem.tabs = tabsWithMeta

  // UPDATE
  setLists(TAB_LISTS, allTabLists)
}
