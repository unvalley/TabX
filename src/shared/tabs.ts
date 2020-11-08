import {browser, Tabs} from 'webextension-polyfill-ts'
import {createNewTabList} from './list'
import * as Storage from './storage'

const getAllInWindow = (windowId?: number) => browser.tabs.query({windowId})

const getAllTabsInCurrentWindow = async () => {
  const currentWindow = await browser.windows.getCurrent()
  return getAllInWindow(currentWindow.id)
}

const closeAllTabs = (tabs: Tabs.Tab[]) =>
  browser.tabs.remove(tabs.map((tab) => tab.id!))

/**
 * openTabLists
 * - check TabX page is already opend or not
 * - if opend, move the TabX page, else open new TabX page
 */
const openTabLists = async () => {
  const openTabs = await getAllTabsInCurrentWindow()
  const tabListsUrl = browser.runtime.getURL('index.html#/app/')

  const isFoundTab = openTabs.find((tab) => tab.url === tabListsUrl)
  if (isFoundTab) {
    return browser.tabs.update(isFoundTab.id, {active: true})
  }
  return await browser.tabs.create({url: tabListsUrl})
}

const storeTabs = async (tabs: Tabs.Tab[]) => {
  const appUrl = browser.runtime.getURL('')
  tabs = tabs.filter((tab) => !tab.url?.startsWith(appUrl))

  const lists = await Storage.getLists()
  if (lists.length === 0) {
    await Storage.setLists(lists)
  }

  const newList = createNewTabList({tabs})
  await Storage.addList(newList)

  return closeAllTabs(tabs)
}

export const storeAllTabs = async () => {
  const tabs = await getAllTabsInCurrentWindow()
  await openTabLists()
  return storeTabs(tabs)
}
