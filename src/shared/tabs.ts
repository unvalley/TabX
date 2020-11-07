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
  //   const lists = await Storage.getLists()
  const appUrl = browser.runtime.getURL('')
  tabs = tabs.filter((tab) => !tab.url?.startsWith(appUrl))
  // const opts = await Storage.getOptions()
  // if (opts.ignorePinned) tabs = tabs.filter((i) => !i.pinned)
  // if (opts.excludeIllegalURL) tabs = tabs.filter((i) => isLegalURL(i.url))
  // if (tabs.length === 0) return
  const lists = await Storage.getLists()
  const newList = createNewTabList({tabs})

  // close the Tab
  return closeAllTabs(tabs)
}

export const storeAllTabs = async () => {
  const tabs = await getAllTabsInCurrentWindow()
  // tabs = [{tab data},{..},...]
  //   const opts = await Storage.getOptions()
  await openTabLists()
  return storeTabs(tabs)
}
