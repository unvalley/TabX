import { Tabs } from 'webextension-polyfill-ts'
import { DomainTabList, ImportedUrlObj, TabList, TabSimple } from './typings'
import { genObjectId, nonNullable } from './utils/util'

// ========================
// Tab
// ========================

export const normalizeTab = (tab: Tabs.Tab) => {
  if (!tab.url) return undefined
  const res = tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalizedTab: TabSimple = {
    id: tab.id || genObjectId(),
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

export const normalizeUrlText = (urlObj: ImportedUrlObj) => {
  const res = urlObj.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalized: TabSimple = {
    id: genObjectId(),
    title: urlObj.title || '',
    pinned: false,
    favorite: false,
    lastAccessed: Date.now(),
    url: urlObj.url,
    favIconUrl: `https://www.google.com/s2/favicons?domain=${urlObj.url}`,
    ogImageUrl: '',
    description: '',
    domain: (res && res[1]) || '',
  }
  return normalized
}

// ========================
// List
// ========================

export const createNewTabList = (tabs: Tabs.Tab[]): TabList => ({
  id: genObjectId(),
  title: '',
  description: '',
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tabs: tabs.map(normalizeTab).filter(nonNullable) || [],
})

export const createNewDomainTabList = (domain: string, tabs: TabSimple[]): DomainTabList => ({
  id: genObjectId(),
  title: '',
  description: '',
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tabs: tabs || [],
  domainName: '',
  domain: domain,
})

export const createNewTabListFromImport = (tabs: TabSimple[]): TabList => ({
  id: genObjectId(),
  title: '',
  description: '',
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tabs: tabs || [],
})
