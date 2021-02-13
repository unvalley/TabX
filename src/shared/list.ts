import { Tabs } from 'webextension-polyfill-ts'
import { DomainTabList, TabList, TabSimple } from './typings'

export const normalizeTab = (tab: Tabs.Tab) => {
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

export const normalizeDomainTab = (tab: Tabs.Tab) => {
  if (!tab.url) return null
  const res = tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalizedTab: TabSimple & { domain: string } = {
    id: tab.id || Date.now(),
    title: tab.title || '',
    pinned: tab.pinned,
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
  title: 'untitled',
  description: '',
  tabs: Array.isArray(tabs) ? tabs.map(normalizeTab) : [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

export const createNewDomainTabList = (domain: string, tabs: Tabs.Tab[]): DomainTabList => ({
  id: Date.now(),
  title: 'untitled',
  description: '',
  tabs: Array.isArray(tabs) ? tabs.map(normalizeTab) : [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  domainName: '',
  domain: domain,
})
