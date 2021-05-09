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
    get: (idx: number) => async ({ get }) => {
      const lists = await get(sortTabListsState)
      return lists[idx]
    },
  }),
})

export const tabListTotalCount = selectorFamily({
  key: 'tabListTotalCount',
  get: (idx: number) => async ({ get }) => {
    const tabList = await get(tabListState(idx))
    const tabs = tabList.tabs
    return !tabs || !tabs.length ? 0 : tabs.length
  },
})
