import {TabWithMeta} from './typings'
import {Tabs} from 'webextension-polyfill-ts'
import {genObjectId} from './utils/util'
import {DEFAULT_TITLE} from './constants'

export const createNewTabList = (tabs: Tabs.Tab[]) => ({
  id: genObjectId(),
  title: DEFAULT_TITLE,
  description: '',
  // Ref: https://stackoverflow.com/questions/49510832/typescript-how-to-map-over-union-array-type
  tabs: Array.isArray(tabs)
    ? (tabs as Array<Tabs.Tab | TabWithMeta>).map((t) => t)
    : [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
})
