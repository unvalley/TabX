import produce, { Draft } from 'immer'

import { TabList } from '~/backend/shared/typings'

///////////////////////////
// producer
///////////////////////////

export const removeTabLink = (tabLists: TabList[], tabListId: number, tabId: number) =>
  produce(tabLists, (draft: Draft<TabList[]>) => {
    const targetTabList = draft.filter(list => list.id === tabListId)[0]
    const index = targetTabList.tabs.findIndex(({ id }) => id === tabId)
    targetTabList.tabs = targetTabList.tabs.filter((_, i) => i !== index)
  })

export const removeTab = (tabList: TabList, tabId: number): TabList =>
  produce(tabList, (draft: Draft<TabList>) => {
    const newTabs = draft.tabs.filter(tab => tab.id !== tabId)
    draft.tabs = newTabs
  })
