import produce, { Draft } from 'immer'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { Themes } from '~/app/constants/styles'
import { TAB_LISTS } from '~/shared/constants'
import { getAllLists } from '~/shared/storage'
import { DomainTabList, TabList } from '~/shared/typings'

/**
 * Root TabListsState
 */
export const tabListsState = atom<TabList[]>({
  key: 'tabListsState',
  default: selector<TabList[]>({
    key: 'tabListsState/Default',
    get: async () => {
      const lists = await getAllLists(TAB_LISTS)
      if (typeof lists === 'undefined') {
        return []
      }
      return lists
    },
  }),
})

/**
 * Children TabListState
 */
export const tabListState = atomFamily<TabList, number>({
  key: 'tabListState',
  default: selectorFamily<TabList, number>({
    key: 'tabListState/Default',
    get: (idx: number) => async ({ get }) => {
      const lists = await get(sortTabListsState)
      return lists[idx]
    },
  }),
})

export const tabListSelectorFamily = selectorFamily({
  key: 'tabListState/selector',
  get: (idx: number) => async ({ get }) => {
    const tabList = await get(tabListState(idx))
    const tabs = tabList.tabs
    if (!tabs || !tabs.length) {
      return 0
    }
    return tabs.length
  },
})

// default: newestAt
export const tabListsSortState = atom({
  key: 'tabListsSortState',
  default: true,
})

export const sortTabListsState = selector<TabList[]>({
  key: 'sortTabListsState',
  get: async ({ get }) => {
    const sort = get(tabListsSortState)
    const lists = await get(tabListsState)

    switch (sort) {
      case true:
        return [...lists].reverse()
      case false:
        return lists
    }
  },
  set: async ({ set }, newValue) => set(tabListsState, newValue),
})

/**
 * Selector for tabLists stats
 * Ref: https://recoiljs.org/docs/basic-tutorial/selectors
 */
export const tabListsStatsState = selector({
  key: 'tabListsStatsState',
  get: async ({ get }) => {
    const tabLists = await get(tabListsState)
    if (!tabLists.length) {
      return 0
    }
    // console.log('tabListsStatsState', tabLists)
    // // return tabLists.map(tabList => tabList.tabs.length).reduce((a, b) => a + b, 0)
    // // TODO: promises?
    // const promises = await tabLists.map(async (_, idx) => await get(tabListState(idx)))
    // console.log(promises)
    // const totalCount = await Promise.all(promises).then(res =>
    //   res.map(tabList => tabList.tabs.length).reduce((prev, cur) => prev + cur),
    // )
    // const totalCount = await tabListElems.map(tabList => tabList.tabs.length).reduce((prev, cur) => prev + cur)

    const totalCount = 2
    return totalCount
  },
})

export const colorThemeState = atom<string>({
  key: 'colorThemeState',
  default: selector({
    key: 'colorThemeState/default',
    get: () => {
      const theme = localStorage.getItem('theme')
      if (theme === null) {
        return Themes.LIGHT
      }
      return theme
    },
  }),
})

///////////////////////////
// producer
///////////////////////////

export const removeTabLink = (tabLists: (TabList | DomainTabList)[], tabListId: number, tabId: number) =>
  produce(tabLists, (draft: Draft<(TabList | DomainTabList)[]>) => {
    const targetTabList = draft.filter(list => list.id === tabListId)[0]
    const idx = targetTabList.tabs.findIndex(({ id }) => id === tabId)
    targetTabList.tabs = targetTabList.tabs.filter((_, i) => i !== idx)
  })

export const removeTab = (tabList: TabList | DomainTabList, tabId: number) =>
  produce(tabList, (draft: Draft<TabList | DomainTabList>) => {
    const newTabs = draft.tabs.filter(tab => tab.id !== tabId)
    draft.tabs = newTabs
  })
