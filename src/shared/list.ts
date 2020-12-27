import {TabListElem, TabWithMeta} from './typings'
import {Tabs} from 'webextension-polyfill-ts'
import {genObjectId} from './utils/util'
import {DEFAULT_TITLE} from './constants'

export const createNewTabList = ({
  id,
  title,
  description,
  tabs,
  createdAt,
  updatedAt,
}: TabListElem) => ({
  id: id || genObjectId(),
  title: title || DEFAULT_TITLE,
  description: description || '',
  // Ref: https://stackoverflow.com/questions/49510832/typescript-how-to-map-over-union-array-type
  tabs: Array.isArray(tabs)
    ? (tabs as Array<Tabs.Tab | TabWithMeta>).map((t) => t)
    : [],
  createdAt: createdAt || Date.now(),
  updatedAt: updatedAt || createdAt || Date.now(),
})
