import { browser, Tabs } from 'webextension-polyfill-ts'

import { StoreTabsError } from '../errors/chromeAction/StoreTabsError'
import { createNewTabList } from '../factory/tabList'
import { ILLEGAL_URLS } from '../shared/constants'
import { TabSimple } from '../shared/typings'
import { IChromeActionUseCase } from '../useCase/chromeActionUseCase'
import { ITabUseCase } from '../useCase/tabUseCase'

export class ChromeActionService implements IChromeActionUseCase {
  constructor(private readonly tabService: ITabUseCase) {}

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
    if (!tabs.length) return

    try {
      const lists = await this.tabService.getAllTabList()
      lists == null ? await this.tabService.setAllTabList([newList]) : await this.tabService.addTabList(newList)
    } catch (err) {
      throw new StoreTabsError(err)
    }
    await this.closeAllTabs(tabs).catch(err => {
      throw new Error(err)
    })
    return newList
  }

  public async storeAllTabs() {
    const tabs = await this.getAllTabsInCurrentWindow()
    const sanitizedTabs = tabs.filter(isValidTab)

    // `res[1]` is storing TabList
    await Promise.all([this.openTabLists(), this.storeTabs(sanitizedTabs)]).then(res => res[1])
  }

  public async restoreTabList(tabListId: number) {
    // SELECT
    const allTabLists = await this.tabService.getAllTabList()
    const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
    // OPEN
    // TODO: refactor
    await this.restoreTabs(targetTabListElem.tabs).then(async () => {
      // DELETE
      await this.tabService.deleteTabList(tabListId)
    })
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
