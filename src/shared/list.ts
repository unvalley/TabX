import {Tabs} from 'webextension-polyfill-ts'
import {genObjectId} from './utils/util'

type NewTab = {
  id?: number
  tabs: Tabs.Tab[]
  createdAt?: Date
  updatedAt?: Date
}

export const createNewTabList = ({id, tabs, createdAt, updatedAt}: NewTab) => ({
  id: id || genObjectId(),
  tabs: Array.isArray(tabs) ? tabs.map((t) => t) : [],
  createdAt: createdAt || Date.now(),
  updatedAt: updatedAt || createdAt || Date.now(),
})
