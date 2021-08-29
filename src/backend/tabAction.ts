import { browser, Tabs } from 'webextension-polyfill-ts'

import { createNewTabList } from './list'
import { tabService } from './services'
import { ILLEGAL_URLS } from './shared/constants'
import { TabSimple } from './shared/typings'

const getAllInWindow = (windowId?: number) => browser.tabs.query({ windowId })

const getAllTabsInCurrentWindow = async () => {
  const currentWindow = await browser.windows.getCurrent()
  return getAllInWindow(currentWindow.id)
}

const closeAllTabs = (tabs: Tabs.Tab[]) => browser.tabs.remove(tabs.map(tab => tab.id!))

/**
 * openTabLists
 * - check TabX page is already opend or not
 * - if opend, move the TabX page, else open new TabX page
 */
const openTabLists = async () => {
  const openTabs = await getAllTabsInCurrentWindow()
  const appUrl = browser.runtime.getURL('index.html#/app/')

  const hasFoundAppTab = openTabs.find(tab => tab.url === appUrl)
  if (hasFoundAppTab) {
    // NOTE: change tab to app and reload
    return await browser.tabs
      .update(hasFoundAppTab.id, { active: true })
      .then(() => browser.tabs.reload(hasFoundAppTab.id))
  }
  return await browser.tabs.create({ url: appUrl, pinned: true })
}

const isLegalURL = (url: string) => ILLEGAL_URLS.every(prefix => !url.startsWith(prefix))

const isValidTab = (tab: Tabs.Tab) => {
  const appUrl = browser.runtime.getURL('index.html#app/')
  if (!tab.url) return false
  return !tab.pinned && !tab.url.startsWith(appUrl) && isLegalURL(tab.url)
}

const storeTabs = async (tabs: Tabs.Tab[]) => {
  if (tabs.length === 0) return
  const newList = createNewTabList(tabs)

  try {
    const lists = await tabService.getAllTabList()
    typeof lists === 'undefined' || lists === null
      ? await tabService.setAllTabList([newList])
      : await tabService.addTabList(newList)
  } catch (err) {
    console.error(err)
  }

  await closeAllTabs(tabs).catch(err => console.error(err))
  return newList
}

export const storeAllTabs = async () => {
  const tabs = await getAllTabsInCurrentWindow()
  const sanitizedTabs = tabs.filter(isValidTab)

  // `res[1]` is storing TabList
  await Promise.all([openTabLists(), storeTabs(sanitizedTabs)]).then(res => res[1])
}

export const restoreTabs = async (tabs: TabSimple[]) => {
  const promises = tabs.map(
    async tab =>
      await browser.tabs.create({
        url: tab.url,
        pinned: tab.pinned,
      }),
  )

  Promise.all(promises)
}
