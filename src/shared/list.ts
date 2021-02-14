import { Tabs } from 'webextension-polyfill-ts'
import { DomainTabList, TabList, TabSimple } from './typings'
import { nonNullable } from './utils/util'

export const normalizeTab = (tab: Tabs.Tab) => {
  if (!tab.url) return undefined
  const res = tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalizedTab: TabSimple = {
    id: tab.id || Date.now(),
    title: tab.title || '',
    pinned: tab.pinned || false,
    favorite: false,
    lastAccessed: tab.lastAccessed || Date.now(),
    url: tab.url || '',
    favIconUrl: tab.favIconUrl || '',
    ogImageUrl: '',
    description: '',
    domain: (res && res[1]) || '',
  }
  return normalizedTab
}

export const createNewTabList = (tabs: Tabs.Tab[]): TabList => ({
  id: Date.now(),
  title: '',
  description: '',
  tabs: tabs.map(normalizeTab).filter(nonNullable) || [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

export const createNewDomainTabList = (domain: string, tabs: TabSimple[]): DomainTabList => ({
  id: Date.now(),
  title: '',
  description: '',
  tabs: tabs || [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  domainName: '',
  domain: domain,
})
