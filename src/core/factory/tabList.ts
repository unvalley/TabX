import { Tabs } from 'webextension-polyfill-ts'

import { TabList, TabSimple } from '../shared/typings'
import { genObjectId, nonNullable } from '../shared/utils'
import { normalizeTab } from './tabSimple'

export const createNewTabList = (tabs: Tabs.Tab[]): TabList => ({
  id: genObjectId(),
  title: '',
  description: '',
  // has pinned on this extension? - default false
  favorite: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tabs: tabs.map(normalizeTab).filter(nonNullable) || [],
})

export const createNewTabListFromImport = (tabs: TabSimple[]): TabList => ({
  id: genObjectId(),
  title: '',
  description: '',
  // has pinned on this extension? - default false
  favorite: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tabs: tabs || [],
})
