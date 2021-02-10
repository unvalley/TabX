import { Tabs } from 'webextension-polyfill-ts'

export type ListElemTabs = Tabs.Tab[] | TabWithMeta[]
/**
 * Each Tab Group
 */
export type TabList = {
  id: number
  title: string
  description: string
  tabs: ListElemTabs
  hasPinned: boolean
  createdAt: number
  updatedAt: number
}

/**
 * Target Metadata fetches from URL
 */
export type TargetMeta = { ogImageUrl: string; description: string }

/**
 * for API Request
 */
export type TargetMetaWithId = TargetMeta & { id: number }

export type TabWithMeta = Tabs.Tab & TargetMeta

/**
 * Domain Type
 */
export type Domain = {
  name: string
  domain: string
  fullPath: string
}
