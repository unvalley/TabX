import { Tabs } from 'webextension-polyfill-ts'

import { ImportedUrlObj, TabSimple } from '../shared/typings'
import { genObjectId } from '../shared/utils'

export const normalizeTab = (tab: Tabs.Tab) => {
  if (!tab.url) return undefined
  const res = tab.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalizedTab: TabSimple = {
    id: tab.id ?? genObjectId(),
    title: tab.title ?? '',
    pinned: tab.pinned ?? false,
    favorite: false,
    lastAccessed: tab.lastAccessed ?? Date.now(),
    url: tab.url ?? '',
    favIconUrl: tab.favIconUrl ?? '',
    ogImageUrl: '',
    description: '',
    domain: (res && res[1]) ?? '',
  }
  return normalizedTab
}

export const normalizeUrlText = (urlObj: ImportedUrlObj) => {
  const res = urlObj.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
  const normalized: TabSimple = {
    id: genObjectId(),
    title: urlObj.title ?? '',
    pinned: false,
    favorite: false,
    lastAccessed: Date.now(),
    url: urlObj.url,
    favIconUrl: `https://www.google.com/s2/favicons?domain=${urlObj.url}`,
    ogImageUrl: '',
    description: '',
    domain: (res && res[1]) ?? '',
  }
  return normalized
}
