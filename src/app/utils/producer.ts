import produce, { Draft } from 'immer'
import { TabList } from '~/shared/typings'

///////////////////////////
// producer
///////////////////////////

export const removeTabLink = (tabLists: TabList[], tabListId: number, tabId: number) =>
  produce(tabLists, (draft: Draft<TabList[]>) => {
    const targetTabList = draft.filter(list => list.id === tabListId)[0]
    const idx = targetTabList.tabs.findIndex(({ id }) => id === tabId)
    targetTabList.tabs = targetTabList.tabs.filter((_, i) => i !== idx)
  })

export const removeTab = (tabList: TabList, tabId: number) =>
  produce(tabList, (draft: Draft<TabList>) => {
    const newTabs = draft.tabs.filter(tab => tab.id !== tabId)
    draft.tabs = newTabs
  })
