/**
 * Basic Tab Type
 */
export type TabSimple = {
  id: number
  title: string
  /**
   * page description
   */
  description?: string
  pinned: boolean
  favorite: boolean
  lastAccessed: number
  url: string
  favIconUrl: string
  /**
   * page ogp url
   */
  ogImageUrl: string
  domain?: string
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
 * for import (text) feature
 */
export type ImportedUrlObj = {
  url: string
  title: string
}
