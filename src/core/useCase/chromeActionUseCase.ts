import { Tabs } from 'webextension-polyfill-ts'

import { TabList, TabSimple } from '../shared/typings'

export interface IChromeActionUseCase {
  getAllInWindow(windowId?: number): Promise<Tabs.Tab[]>
  getAllTabsInCurrentWindow(): Promise<Tabs.Tab[]>
  closeAllTabs(tabs: Tabs.Tab[]): Promise<void>
  openTabLists(): Promise<void | Tabs.Tab>
  storeTabs(tabs: Tabs.Tab[]): Promise<TabList | undefined>
  storeAllTabs(): Promise<void>
  restoreTabs(tabs: TabSimple[]): Promise<void>
}
