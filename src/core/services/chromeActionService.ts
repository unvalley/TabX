import { browser, Tabs } from 'webextension-polyfill-ts'

import { createNewTabList } from '../factory/tabList'
import { ILLEGAL_URLS } from '../shared/constants'
import { TabSimple } from '../shared/typings'
import { IChromeActionUseCase } from '../useCase/chromeActionUseCase'
import { tabService } from '.'

export class ChromeActionService implements IChromeActionUseCase {
  public getAllInWindow(windowId?: number) {
    return browser.tabs.query({ windowId })
  }

  public async getAllTabsInCurrentWindow() {
    const currentWindow = await browser.windows.getCurrent()
    return this.getAllInWindow(currentWindow.id)
  }

  public closeAllTabs(tabs: Tabs.Tab[]) {
    return browser.tabs.remove(tabs.map(tab => tab.id!))
  }

  /**
   * openTabLists
   * - check TabX page is already opend or not
   * - if opend, move the TabX page, else open new TabX page
   */
  public async openTabLists() {
    const openTabs = await this.getAllTabsInCurrentWindow()
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

  public async storeTabs(tabs: Tabs.Tab[]) {
    const newList = createNewTabList(tabs)

    try {
      const lists = await tabService.getAllTabList()
      typeof lists === 'undefined' || lists === null
        ? await tabService.setAllTabList([newList])
        : await tabService.addTabList(newList)
    } catch (err) {
      console.error(err)
    }
    await this.closeAllTabs(tabs).catch(err => console.error(err))
    return newList
  }

  public async storeAllTabs() {
    const tabs = await this.getAllTabsInCurrentWindow()
    const sanitizedTabs = tabs.filter(isValidTab)

    // `res[1]` is storing TabList
    await Promise.all([this.openTabLists(), this.storeTabs(sanitizedTabs)]).then(res => res[1])
  }

  public async restoreTabs(tabs: TabSimple[]) {
    const promises = tabs.map(
      async tab =>
        await browser.tabs.create({
          url: tab.url,
          pinned: tab.pinned,
        }),
    )
    Promise.all(promises)
  }
}

const isLegalURL = (url: string) => ILLEGAL_URLS.every(prefix => !url.startsWith(prefix))

const isValidTab = (tab: Tabs.Tab) => {
  const appUrl = browser.runtime.getURL('index.html#app/')
  if (!tab.url) return false
  return !tab.pinned && !tab.url.startsWith(appUrl) && isLegalURL(tab.url)
}
