import {browser} from 'webextension-polyfill-ts'
import {TabListElem, TabLists} from './typings'

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

export const getAllTabLists = async () =>
  get('lists').then(({lists}) => lists as TabLists)

export const setLists = (lists: TabLists) => {
  const filterdLists = lists.filter((list) => list.tabs)
  return set({lists: filterdLists})
}

export const addList = async (newList: TabListElem) => {
  const lists = await getAllTabLists()
  lists.push(newList)
  return await setLists(lists)
}

/**
 * タブ要素の削除
 * @param id
 */
export const deleteTabLink = async (tabsId: number, tabId: number) => {
  // READ
  const allTabLists = await getAllTabLists()
  const targetTabListElem = allTabLists.filter((list) => list.id === tabsId)[0]
  const tabs = targetTabListElem.tabs
  const idx = tabs.findIndex(({id}) => id === tabId)

  // DELETE and hanlde if tabs are empty
  tabs.splice(idx, 1)
  !tabs.length && deleteTabListElem(allTabLists, tabsId)

  // UPDATE
  setLists(allTabLists)
}

/**
 * タブリスト要素の削除
 * @param allTabLists
 * @param tabsId
 */
export const deleteTabListElem = async (
  allTabLists: TabLists,
  tabsId: number,
) => {
  const tabListsIdx = allTabLists.findIndex(({id}) => id === tabsId)
  allTabLists.splice(tabListsIdx, 1)
}
