import {TabListElem} from './typings'
import {genObjectId} from './utils/util'

export const createNewTabList = ({
  id,
  title,
  description,
  tabs,
  createdAt,
  updatedAt,
}: TabListElem) => ({
  id: id || genObjectId(),
  title: title || 'untitled',
  description: description || '',
  tabs: Array.isArray(tabs) ? tabs.map((t) => t) : [],
  createdAt: createdAt || Date.now(),
  updatedAt: updatedAt || createdAt || Date.now(),
})
