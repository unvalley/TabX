import {browser, Tabs} from 'webextension-polyfill-ts'
import {TabListElem, TabLists, TabWithMeta} from './typings'
import {acquireMetadata} from './utils/api'
import {zip} from './utils/util'
import {Mutex} from 'async-mutex'

const mutex = new Mutex()
const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

// for Testing
export const getAllRandomTabLists = async () => {
  // TODO: create mock data
  return [] as TabLists
}

export const getAllTabLists = async () =>
  await get('lists').then(({lists}) =>
    Array.isArray(lists) ? (lists as TabLists) : [],
  )

export const setLists = (lists: TabLists) => {
  const filterdLists = lists.filter((list) => list.tabs)
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
    const targetTabListElem = allTabLists.filter(
      (list) => list.id === tabsId,
    )[0]
    const tabs = targetTabListElem.tabs
    const idx = tabs.findIndex(({id}) => id === tabId)
    // DELETE and hanlde if tabs are empty
    // NOTE: if performance is poor, deleteTabListElem can be changed to give allTabLists
    tabs.splice(idx, 1)
    !tabs.length && deleteTabListElem(tabsId)
    // UPDATE
    setLists(allTabLists)
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
