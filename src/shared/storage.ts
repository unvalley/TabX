import {browser} from 'webextension-polyfill-ts'
import {TabListElem, TabLists} from './typings'

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

export const getAllTabLists = async () =>
  get('lists').then(({lists}) => lists as TabLists)

export const setLists = (lists: TabLists) => {
  const handledLists = lists.filter((list) => list.tabs)
  return set({lists: handledLists})
}

export const addList = async (newList: TabListElem) => {
  const lists = await getAllTabLists()
  lists.push(newList)
  return await setLists(lists)
}

/**
 * タブの削除
 * @param id
 */
export const deleteTabLink = async (tabsId: number, tabId: number) => {
  const allTabLists = await getAllTabLists()
  const targetTabList = allTabLists.filter((list) => list.id === tabsId)
  const tabs = targetTabList[0].tabs
  const idx = tabs.findIndex(({id}) => id === tabId)
  tabs.splice(idx, 1)

  setLists(allTabLists)
}

/**
 * タブグループの削除
 * @param lists
 */
export const deleteLists = async (lists: TabLists) => {}
