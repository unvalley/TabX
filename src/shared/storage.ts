import { Mutex } from 'async-mutex'
import produce from 'immer'
import { browser } from 'webextension-polyfill-ts'
import { loadCache, saveCache } from './cache'
import { TAB_LISTS } from './constants'
import { restoreTabs } from './tabAction'
import { ListName, TabList, TabSimple } from './typings'
import { genParamsToFetchMetadata, zip } from './utils'
import { acquireMetadata } from './utils/api'

const mutex = new Mutex()

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: Record<string, unknown>) => browser.storage.local.set(obj)

// ========================
// Storage Operations
// ========================

export const getAllLists = async <T extends ListName>(key: T): Promise<TabList[]> => {
  const cachedData = loadCache()
  if (cachedData.length > 0) {
    return cachedData
  }
  const res = await get(key).then(data => (Array.isArray(data[key]) ? (data[key] as TabList[]) : []))
  saveCache(key, res)
  return res
}

export const getAllFlatTabs = async () => {
  const res = await get(TAB_LISTS).then(data => (Array.isArray(data[TAB_LISTS]) ? (data[TAB_LISTS] as TabList[]) : []))
  const flatTabs = res.map(tabList => tabList.tabs).flat()
  return flatTabs
}

export const setLists = (key: ListName, lists: TabList[]) => {
  saveCache(key, [])
  return set({ [key]: lists })
}

export const addList = async (key: ListName, newList: TabList) => {
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
      const index = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter((_, i) => i !== index)
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(key, tabListId)
    })
    // UPDATE
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
