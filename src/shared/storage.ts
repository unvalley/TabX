import {browser} from 'webextension-polyfill-ts'
import {TabListElem, TabLists} from './typings'

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

export const getLists = async () =>
  get('lists').then(({lists}) => lists as TabLists)

export const setLists = (lists: TabLists) => {
  // TODO: normalize
  const handledLists = lists.filter((list) => list.tabs)
  return set({lists: handledLists})
}

export const addList = async (newList: TabListElem) => {
  const lists = await getLists()
  lists.push(newList)
  return await setLists(lists)
}
