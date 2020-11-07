import {browser, Tabs} from 'webextension-polyfill-ts'
import {createNewTabList} from './list'
import * as Storage from './storage'

const getAllInWindow = (windowId?: number) => browser.tabs.query({windowId})

const getAllTabsInCurrentWindow = async () => {
  const currentWindow = await browser.windows.getCurrent()
  return getAllInWindow(currentWindow.id)
}

const storeTabs = async (tabs: Tabs.Tab[], listIndex?: number) => {
  const lists = await Storage.getLists()
  if (listIndex == undefined) {
    const newList = createNewTabList({tabs})
    console.log(newList)
  } else {
    const list = lists[listIndex]
    tabs.forEach((tab) => list.tabs.push(tab))
  }
}

export const storeAllTabs = async (listIndex: number) => {
  const tabs = await getAllTabsInCurrentWindow()
  return storeTabs(tabs, listIndex)
}
