import { atom, selector } from 'recoil'

import { TAB_LISTS } from '~/shared/constants'
import { getAllLists } from '~/shared/storage'
import { TabList } from '~/shared/typings'

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
