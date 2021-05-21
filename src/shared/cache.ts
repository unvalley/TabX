import { TAB_LISTS } from './constants'
import { TabList } from './typings'
import { eq, when } from './utils'

export const cache = { tabLists: [] as TabList[] }
export const saveCache = (storageKey: string, lists: TabList[]) =>
  when(storageKey).on(eq(TAB_LISTS), () => (cache.tabLists = lists as TabList[]))

export const loadCache = () => cache.tabLists
