import {getAllTabLists} from '../../shared/storage'
import {TabLists, TabWithMeta} from '@shared/typings'
import {atom, atomFamily, selector} from 'recoil'
import {Themes} from '../constants/styles'
import {Lang} from '../constants'
import * as Storage from '../../shared/storage'
import tabs from '@geist-ui/react/dist/tabs/tabs'

const browserStorageEffect = () => ({setSelf, trigger}: any) => {
  // myBrowserStorage.onChange(tabId, tablists => {
  //     setSelf(tabLists)
  // })
  Storage.onChange()
  console.log('here')
  if (trigger === 'get') {
    setSelf(Storage.getAllTabLists())
  }
  //   setSelf(newValue)
  //   return () => {
  //     myBrowserStorage.onChange(tabId, tabLists)
  //   }
}

export const tabListsState = atom<TabLists>({
  key: 'tabListsState',
  default: selector<TabLists>({
    key: 'tabListsState/Default',
    get: async () => {
      const lists = await getAllTabLists()
      if (lists === undefined) {
        return [{}, {}] as TabLists
      }
      return lists
    },
  }),
  effects_UNSTABLE: [
    //   Storage.onChange()
    browserStorageEffect(),
  ],
})

/**
 * Selector for tabLists stats
 * Ref: https://recoiljs.org/docs/basic-tutorial/selectors
 */
export const tabListsStatsState = selector({
  key: 'tabListsStatsState',
  get: async ({get}) => {
    const tabLists = await get(tabListsState)
    const totalTabsCount = tabLists
      .map((te) => te.tabs.length)
      .reduce((prev, cur) => prev + cur)
    return totalTabsCount
  },
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

//
export const uniqTabListsState = selector({
  key: 'uniqTabListsState',
  get: async ({get}) => {
    const lists = await get(tabListsState)
    const uniqFlatTabs = [...new Set(lists.flatMap(({tabs}) => tabs))]
    return uniqFlatTabs
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
