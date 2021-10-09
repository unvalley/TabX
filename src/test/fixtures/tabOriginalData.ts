import { Tabs } from 'webextension-polyfill-ts'

export const FixutreTab = (url?: string) => {
  return {
    id: 1,
    index: 1,
    highlighted: false,
    active: true,
    pinned: false,
    lastAccessed: 1,
    url: url,
    title: 'example',
    favIconUrl: '',
    status: '',
    discarded: false,
    incognito: false,
    width: 1,
    height: 1,
    hidden: false,
    sessionId: '',
    cookieStoreId: '',
    isArticle: false,
    isInReaderMode: false,
    attention: false,
    successorTabId: 1,
    autoDiscardable: false,
  } as Tabs.Tab
}
