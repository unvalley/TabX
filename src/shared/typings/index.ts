/**
 * Basic Tab Type
 */
export type TabSimple = {
  id: number
  title: string
  pinned: boolean
  lastAccessed: number
  url: string
  favIconUrl: string
  /**
   * page ogp url
   */
  ogImageUrl: string
  /**
   * page description
   */
  description: string
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
