import {getAllTabLists} from '../../shared/storage'
import {TabLists, TabWithMeta} from '@shared/typings'
import {atom, selector} from 'recoil'
import {Themes} from '../constants/styles'
import {Lang} from '../constants'

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

export const colorThemeState = atom({
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

export const langState = atom<string>({
  key: 'langState',
  default: selector({
    key: 'langState/default',
    get: () => {
      const lang = localStorage.getItem('lang')
      if (lang === null) {
        return Lang.ENGLISH
      }
      return lang
    },
  }),
})
