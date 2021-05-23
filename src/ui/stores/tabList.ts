import { atomFamily, selectorFamily } from 'recoil'

import { TabList } from '~/shared/typings'

import { sortTabListsState } from './tabLists'

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

export const tabListTotalCount = selectorFamily({
  key: 'tabListTotalCount',
  get: (index: number) => async ({ get }) => {
    const tabList = await get(tabListState(index))
    const tabs = tabList.tabs
    return !tabs || !tabs.length ? 0 : tabs.length
  },
})
