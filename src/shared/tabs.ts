import {browser, Tabs} from 'webextension-polyfill-ts'
import {ILLEGAL_URLS} from './constants'
import {createNewTabListElem} from './list'
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
  const appUrl = browser.runtime.getURL('index.html#/app/')

  const hasFoundAppTab = openTabs.find((tab) => tab.url === appUrl)
  if (hasFoundAppTab) {
    return browser.tabs.update(hasFoundAppTab.id, {active: true})
  }
  return await browser.tabs.create({url: appUrl, pinned: true})
}

const isLegalURL = (url: string) =>
  ILLEGAL_URLS.every((prefix) => !url.startsWith(prefix))

const isValidTab = (tab: Tabs.Tab) => {
  const appUrl = browser.runtime.getURL('index.html#app/')
  if (!tab.url) return false
  return !tab.pinned && !tab.url.startsWith(appUrl) && isLegalURL(tab.url)
}

const storeTabs = async (tabs: Tabs.Tab[]) => {
  if (tabs.length === 0) return
  const newList = createNewTabListElem(tabs)

  try {
    const lists = await Storage.getAllTabLists()
    lists === undefined || lists === null
      ? await Storage.setLists([newList])
      : await Storage.addList(newList)
  } catch (err) {
    console.error(err)
  }

  await closeAllTabs(tabs)
  return newList
}

export const storeAllTabs = async () => {
  const tabs = await getAllTabsInCurrentWindow()
  const sanitizedTabs = tabs.filter(isValidTab)

  await Promise.all([openTabLists(), storeTabs(sanitizedTabs)]).then(
    (res) =>
      // res[1] = storing TabListElem
      // NOTE: fetch decription and ogImageUrl from URL
      res[1] && Storage.updateTabListElemWithMeta(res[1].id),
  )
}

export const restoreTabListElem = (id: number) => {}
