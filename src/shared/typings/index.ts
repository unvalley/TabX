import {Tabs} from 'webextension-polyfill-ts'

/**
 * Each Tab Group
 */
export type TabListElem = {
  id?: number
  title?: string
  description?: string
  tabs: Tabs.Tab[] | TabWithMeta[]
  createdAt?: number
  updatedAt?: number
}

/**
 * All Tab Groups
 */
export type TabLists = TabListElem[]

/**
 * Target Metadata fetches from URL
 */
export type TargetMeta = {ogImageUrl: string; description: string}

export type TabWithMeta = Tabs.Tab & TargetMeta
export type TargetMetaWithId = TargetMeta & {id: number}
