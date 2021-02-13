/**
 * Basic Tab Type
 */
export type TabSimple = {
  id: number
  title: string
  /**
   * page description
   */
  description: string
  pinned: boolean
  lastAccessed: number
  url: string
  favIconUrl: string
  /**
   * page ogp url
   */
  ogImageUrl: string
}

/**
 * Each Tab Group
 */
export type TabList = {
  id: number
  title: string
  description: string
  tabs: TabSimple[]
  hasPinned: boolean
  createdAt: number
  updatedAt: number
}

export type DomainTabList = TabList & {
  domainName: string
  domain: string
}

/**
 * Target Metadata fetches from URL
 */
export type TargetMeta = {}

/**
 * for API Request
 */
export type TargetMetaWithId = TargetMeta & { id: number }

export type TabWithMeta = TabSimple & TargetMeta

/**
 * Domain Type
 */
export type Domain = {
  name: string
  domain: string
  fullPath: string
}

export type ListType<T> = T extends 'domainTabLists' ? DomainTabList : T extends 'tabLists' ? TabList : never
export type ListName = 'tabLists' | 'domainTabLists'
