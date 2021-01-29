import {Mutex} from 'async-mutex'
import {browser, Tabs} from 'webextension-polyfill-ts'
import {TabListElem, TabLists, TabWithMeta} from './typings'
import {acquireMetadata} from './utils/api'
import {zip} from './utils/util'
import produce from 'immer'

const mutex = new Mutex()
const cache = {lists: [] as TabLists}
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
  const allTabLists = await get('lists').then(({lists}) =>
    Array.isArray(lists) ? (lists as TabLists) : [],
  )
  cache.lists = allTabLists
  return cache.lists
}

export const setLists = (lists: TabLists) => {
  const filterdLists = lists.filter((list) => list.tabs)
  cache.lists = []
  return set({lists: filterdLists})
}

export const addList = async (newList: TabListElem) => {
  const lists = await getAllTabLists()
  lists.push(newList)
  return await setLists(lists)
}

export const deleteAllTabLists = () => set({lists: null})

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
      !targetTabListElem.tabs.length && deleteTabListElem(tabsId)
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
 * Delete TabListElem
 * @param tabsId
 */
export const deleteTabListElem = async (tabsId: number) => {
  const release = await mutex.acquire()
  try {
    const allTabLists = await getAllTabLists()
    const tabListsIdx = allTabLists.findIndex(({id}) => id === tabsId)
    allTabLists.splice(tabListsIdx, 1)
    setLists(allTabLists)
  } finally {
    release()
  }
}

export const pinnTabListElem = async (tabsId: number) => {
  // SELECT
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter((list) => list.id === tabsId)[0]

  // UPDATE
  targetTabListElem.hasPinned = true
  setLists(allTabLists)
}

const genParams = (tabs: Tabs.Tab[]) =>
  tabs.map((tab) => {
    return {
      id: tab.id as number,
      url: tab.url as string,
    }
  })

const mergeTabsWithMeta = async (tabs: Tabs.Tab[]) => {
  const params = genParams(tabs)
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
