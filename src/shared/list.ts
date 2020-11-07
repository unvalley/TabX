import {Tabs} from 'webextension-polyfill-ts'
import {genObjectId} from './utils/util'

type NewTab = {
  id?: number
  title?: string
  description?: string
  tabs: Tabs.Tab[]
  createdAt?: Date
  updatedAt?: Date
}

export const createNewTabList = ({
  id,
  title,
  description,
  tabs,
  createdAt,
  updatedAt,
}: NewTab) => ({
  id: id || genObjectId(),
  title: title || '',
  description: description || '',
  tabs: Array.isArray(tabs) ? tabs.map((t) => t) : [],
  createdAt: createdAt || Date.now(),
  updatedAt: updatedAt || createdAt || Date.now(),
})
