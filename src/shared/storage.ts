import { Mutex } from 'async-mutex'
import produce from 'immer'
import { browser } from 'webextension-polyfill-ts'
import { restoreTabs } from './tabs'
import { Domain, TabList, TabSimple } from './typings'
import { acquireMetadata } from './utils/api'
import { genParamsToFetchMetadata, zip } from './utils/util'

const LISTS = 'lists'
const DOMAINS = 'domains'

const mutex = new Mutex()

const cache = { lists: [] as TabList[], domains: [] as Domain[] }
const get = (key: string) => browser.storage.local.get(key)
const set = (obj: Record<string, unknown>) => browser.storage.local.set(obj)

// for Testing
export const getAllRandomTabLists = async () => {
  // TODO: create mock data
  return [] as TabList[]
}

export const getAllTabLists = async () => {
  if (cache.lists.length > 0) {
    return cache.lists
  }
  const allTabLists = await get(LISTS).then(({ lists }) => (Array.isArray(lists) ? (lists as TabList[]) : []))
  cache.lists = allTabLists
  return cache.lists
}

export const getAllDomains = async () => {
  if (cache.domains.length > 0) {
    return cache.domains
  }
  const allDomains = await get(DOMAINS).then(({ domains }) => (Array.isArray(domains) ? (domains as Domain[]) : []))
  cache.domains = allDomains
  return cache.domains
}

export const setLists = (lists: TabList[]) => {
  const filterdLists = lists.filter(list => list.tabs)
  cache.lists = []
  return set({ lists: filterdLists })
}

export const addList = async (newList: TabList) => {
  const allTabLists = await getAllTabLists()
  const updatedAllTabLists = produce(allTabLists, draft => {
    draft.push(newList)
  })
  return setLists(updatedAllTabLists)
}

export const deleteAllTabLists = () => set({ lists: null })
export const deleteAllDomains = () => set({ domains: null })

/**
 * Delete Single Tab Link in a TabList
 * @param id
 */
export const deleteTabLink = async (tabListId: number, tabId: number) => {
  const release = await mutex.acquire()
  try {
    // SELECT
    const allTabLists = await getAllTabLists()
    const updatedAllTabLists = produce(allTabLists, draft => {
      const targetTabListElem = draft.filter(list => list.id === tabListId)[0]
      const idx = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter((_, i) => i !== idx)
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(tabListId)
    })
    // UPDATE
    setLists(updatedAllTabLists)
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
    const allTabLists = await getAllTabLists()
    const updatedAllTabLists = produce(allTabLists, draft => {
      const listIdx = draft.findIndex(({ id }) => id === tabListId)
      draft.splice(listIdx, 1)
    })
    setLists(updatedAllTabLists)
  } finally {
    release()
  }
}

export const pinnTabList = async (tabListId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(allTabLists)
}

export const restoreTabList = async (tabListId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
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
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
  // NOTE: prepare data for update
  const tabsWithMeta = await mergeTabsWithMeta(targetTabListElem.tabs)
  targetTabListElem.tabs = tabsWithMeta

  // UPDATE
  setLists(allTabLists)
}
