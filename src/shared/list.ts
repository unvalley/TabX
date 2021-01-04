import {Tabs} from 'webextension-polyfill-ts'
import {DEFAULT_TITLE} from './constants'
import {TabWithMeta} from './typings'
import {genObjectId} from './utils/util'

export const createNewTabListElem = (tabs: Tabs.Tab[]) => ({
  id: genObjectId(),
  title: DEFAULT_TITLE,
  description: '',
  // Ref: https://stackoverflow.com/questions/49510832/typescript-how-to-map-over-union-array-type
  tabs: Array.isArray(tabs)
    ? (tabs as Array<Tabs.Tab | TabWithMeta>).map((t) => t)
    : [],
  // has pinned on this extension? - default false
  hasPinned: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})
