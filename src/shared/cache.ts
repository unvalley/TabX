import { DOMAIN_TAB_LISTS, TAB_LISTS } from './constants'
import { ObjectType, TypeName } from './storage'
import { DomainTabList, TabList } from './typings'
import { eq, when } from './utils/util'

export const cache = { tabLists: [] as TabList[], domainTabLists: [] as DomainTabList[] }
export const saveCache = (storageKey: string, lists: TabList[] | DomainTabList[]) =>
  when(storageKey)
    .on(eq(TAB_LISTS), () => (cache.tabLists = lists as TabList[]))
    .on(eq(DOMAIN_TAB_LISTS), () => (cache.domainTabLists = lists as DomainTabList[]))

export const loadCache = <T extends TypeName>(storageKey: T): ObjectType<T>[] => cache[storageKey]
//   when(storageKey
//     .on(eq(TAB_LISTS), () => cache.tabLists)
//     .on(eq(DOMAIN_TAB_LISTS), () => cache.domainTabLists)
//     .otherwise(() => [])
