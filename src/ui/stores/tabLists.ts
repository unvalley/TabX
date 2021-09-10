import { atom, selector } from 'recoil'

import { tabService } from '~/core/services'
import { TabList } from '~/core/shared/typings'

/**
 * Root TabListsState
 */
export const tabListsState = atom<TabList[]>({
  key: 'tabListsState',
  default: selector<TabList[]>({
    key: 'tabListsState/Default',
    get: async () => {
      const lists = await tabService.getAllTabList()
      if (!lists.length) return []
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

export const favoriteTabListsState = selector<TabList[]>({
  key: 'favoriteTabListsState',
  get: async ({ get }) => {
    const lists = await get(tabListsState)
    const favoriteLists = lists.filter(list => list.favorite === true)
    return favoriteLists
  },
})
