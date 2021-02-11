import { Tabs } from 'webextension-polyfill-ts'
import { TabSimple } from './typings'
import { genObjectId } from './utils/util'

const normalizeTab = (tab: Tabs.Tab) => {
  const normalizedTab: TabSimple = {
    id: tab.id || Date.now(),
    title: tab.title || '',
    pinned: tab.pinned,
    lastAccessed: tab.lastAccessed || Date.now(),
    url: tab.url || '',
    favIconUrl: tab.favIconUrl || '',
    ogImageUrl: '',
    description: '',
  }
  return normalizedTab
}

export const createNewTabList = (tabs: Tabs.Tab[]) => ({
  id: genObjectId(),
  // TODO: change
  title: tabs[0].title || '',
  description: '',
  tabs: Array.isArray(tabs) ? tabs.map(normalizeTab) : [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})
