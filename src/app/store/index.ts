import {getAllTabLists} from '../../shared/storage'
import {TabLists} from '@shared/typings'
import {atom, selector} from 'recoil'

export const tabListsState = atom<TabLists>({
  key: 'tabListsState',
  default: selector({
    key: 'tabListsState/Default',
    get: async () => {
      const lists = await getAllTabLists()
      return lists
    },
  }),
})

// default: newestAt
export const tabListsSortState = atom({
  key: 'tabListsSortState',
  default: true,
})

export const sortTabListsState = selector<TabLists>({
  key: 'sortTabListsState',
  get: async ({get}) => {
    const sort = get(tabListsSortState)
    const lists = await get(tabListsState)

    switch (sort) {
      case true:
        return [...lists].reverse()
      case false:
        return lists
    }
  },
  set: async ({get, set}, newValue) => set(tabListsState, newValue),
})
