import produce, { Draft } from 'immer'
import { DomainTabList, TabList } from '~/shared/typings'

///////////////////////////
// producer
///////////////////////////

export const removeTabLink = (tabLists: (TabList | DomainTabList)[], tabListId: number, tabId: number) =>
  produce(tabLists, (draft: Draft<(TabList | DomainTabList)[]>) => {
    const targetTabList = draft.filter(list => list.id === tabListId)[0]
    const idx = targetTabList.tabs.findIndex(({ id }) => id === tabId)
    targetTabList.tabs = targetTabList.tabs.filter((_, i) => i !== idx)
  })

export const removeTab = (tabList: TabList | DomainTabList, tabId: number) =>
  produce(tabList, (draft: Draft<TabList | DomainTabList>) => {
    const newTabs = draft.tabs.filter(tab => tab.id !== tabId)
    draft.tabs = newTabs
  })
