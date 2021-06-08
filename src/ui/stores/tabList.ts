import { atomFamily, selector, selectorFamily } from 'recoil'

import { TabList } from '~/shared/typings'

import { sortTabListsState, tabListsState } from './tabLists'

/**
 * Children TabListState
 */
export const tabListState = atomFamily<TabList, number>({
  key: 'tabListState',
  default: selectorFamily<TabList, number>({
    key: 'tabListState/Default',
    get: (index: number) => async ({ get }) => {
      const lists = await get(sortTabListsState)
      return lists[index]
    },
  }),
})

export const totalTabCountSelector = selector({
  key: 'totalTabCount',
  get: async ({ get }) => {
    const tabLists = await get(tabListsState)
    if (tabLists.length === 0) return 0
    const tabCounts = tabLists.flatMap(e => e.tabs.length)
    const totalTabCount = tabCounts.reduce((prev, cur) => prev + cur)
    return totalTabCount
  },
})
