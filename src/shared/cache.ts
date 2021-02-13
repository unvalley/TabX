import { DOMAIN_TAB_LISTS, TAB_LISTS } from './constants'
import { DomainTabList, ListName, ListType, TabList } from './typings'
import { eq, when } from './utils/util'

export const cache = { tabLists: [] as TabList[], domainTabLists: [] as DomainTabList[] }
export const saveCache = (storageKey: string, lists: TabList[] | DomainTabList[]) =>
  when(storageKey)
    .on(eq(TAB_LISTS), () => (cache.tabLists = lists as TabList[]))
    .on(eq(DOMAIN_TAB_LISTS), () => (cache.domainTabLists = lists as DomainTabList[]))

export const loadCache = <T extends ListName>(storageKey: T): ListType<T>[] => cache[storageKey] as ListType<T>[]
