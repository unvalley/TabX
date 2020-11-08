import {Tabs} from 'webextension-polyfill-ts'

export type TabListElem = {
  id?: number
  title?: string
  description?: string
  tabs: Tabs.Tab[]
  createdAt?: number
  updatedAt?: number
}

export type TabLists = TabListElem[]
