import {Mutex} from 'async-mutex'
import {browser, Tabs} from 'webextension-polyfill-ts'
import {TabListElem, TabLists, TabWithMeta} from './typings'
import {acquireMetadata} from './utils/api'
import {genParamsToFetchMetadata, zip} from './utils/util'
import produce from 'immer'
import {restoreTabs} from './tabs'

const LISTS = 'lists'
const DOMAINS = 'domains'

const mutex = new Mutex()
type Domains = {
  name: string
  domain: string
  fullPath: string
}[]

const cache = {lists: [] as TabLists, domains: [] as Domains}
const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

// for Testing
export const getAllRandomTabLists = async () => {
  // TODO: create mock data
  return [] as TabLists
}

export const getAllTabLists = async () => {
  if (cache.lists.length > 0) {
    return cache.lists
  }
  const allTabLists = await get(LISTS).then(({lists}) =>
    Array.isArray(lists) ? (lists as TabLists) : [],
  )
  cache.lists = allTabLists
  return cache.lists
}

export const getAllDomains = async () => {
  if (cache.domains.length > 0) {
    return cache.domains
  }
  const allDomains = await get(DOMAINS).then(({domains}) =>
    Array.isArray(domains) ? (domains as Domains) : [],
  )
  cache.domains = allDomains
  return cache.domains
}

export const setLists = (lists: TabLists) => {
  const filterdLists = lists.filter((list) => list.tabs)
  cache.lists = []
  return set({lists: filterdLists})
}

export const addList = async (newList: TabListElem) => {
  const allTabLists = await getAllTabLists()
  const updatedAllTabLists = produce(allTabLists, (draft) => {
    draft.push(newList)
  })
  return setLists(updatedAllTabLists)
}

export const deleteAllTabLists = () => set({lists: null})
export const deleteAllDomains = () => set({domains: null})

/**
 * Delete Single Tab Link in a TabListElem
 * @param id
 */
export const deleteTabLink = async (tabsId: number, tabId: number) => {
  const release = await mutex.acquire()
  try {
    // SELECT
    const allTabLists = await getAllTabLists()
    const updatedAllTabLists = produce(allTabLists, (draft) => {
      const targetTabListElem = draft.filter((list) => list.id === tabsId)[0]
      const idx = targetTabListElem.tabs.findIndex(({id}) => id === tabId)
      targetTabListElem.tabs = targetTabListElem.tabs.filter(
        (_, i) => i !== idx,
      )
      // DELETE and hanlde if tabs are empty
      !targetTabListElem.tabs.length && deleteTabList(tabsId)
    })
    // UPDATE
    setLists(updatedAllTabLists)
    return updatedAllTabLists
  } catch (err) {
    console.error(err)
  } finally {
    release()
  }
}

/**
 * Delete TabListElem
 * @param tabsId
 */
export const deleteTabList = async (tabsId: number) => {
  const release = await mutex.acquire()
  try {
    const allTabLists = await getAllTabLists()
    const updatedAllTabLists = produce(allTabLists, (draft) => {
      const listIdx = draft.findIndex(({id}) => id === tabsId)
      draft.splice(listIdx, 1)
    })
    setLists(updatedAllTabLists)
  } finally {
    release()
  }
}

export const pinnTabList = async (tabsId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter((list) => list.id === tabsId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(allTabLists)
}

export const restoreTabList = async (tabsId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter((list) => list.id === tabsId)[0]
  // OPEN
  await restoreTabs(targetTabListElem.tabs)
  // DELETE
  await deleteTabList(tabsId)
}

const mergeTabsWithMeta = async (tabs: Tabs.Tab[]) => {
  const params = genParamsToFetchMetadata(tabs)
  const metaObjs = await acquireMetadata(params)

  const tabsWithMetas: TabWithMeta[] = []
  // NOTE: merge tabs and metaObjs
  for (const [tab, metaObj] of zip(tabs, metaObjs)) {
    tabsWithMetas.push({...tab, ...metaObj})
  }
  return tabsWithMetas
}

export const updateTabListElemWithMeta = async (tabsId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter((list) => list.id === tabsId)[0]
  // NOTE: prepare data for update
  const tabsWithMeta = await mergeTabsWithMeta(targetTabListElem.tabs)
  targetTabListElem.tabs = tabsWithMeta

  // UPDATE
  setLists(allTabLists)
}
