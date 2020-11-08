import {browser, Tabs} from 'webextension-polyfill-ts'
import {ILLEGAL_URLS} from '../shared/constants/constants'
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

const isLegalURL = (url: string) =>
  ILLEGAL_URLS.every((prefix) => !url.startsWith(prefix))

const isValidTab = (tab: Tabs.Tab) => {
  const appUrl = browser.runtime.getURL('')
  return tab.url && !tab.url.startsWith(appUrl) && isLegalURL(tab.url)
}

const storeTabs = async (tabs: Tabs.Tab[]) => {
  tabs = tabs.filter(isValidTab)
  if (tabs.length === 0) return

  const lists = await Storage.getLists()
  if (lists === undefined) {
    const firstList = createNewTabList({tabs})
    await Storage.setLists([firstList])
  } else {
    const newList = createNewTabList({tabs})
    await Storage.addList(newList)
  }

  return closeAllTabs(tabs)
}

export const storeAllTabs = async () => {
  const tabs = await getAllTabsInCurrentWindow()
  await openTabLists()
  return storeTabs(tabs)
}
