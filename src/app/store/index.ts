import produce, {Draft} from 'immer'
import {atom, atomFamily, selector, selectorFamily} from 'recoil'
import {Lang} from '~/app/constants/index'
import {Themes} from '~/app/constants/styles'
import {getAllTabLists} from '~/shared/storage'
import {TabListElem, TabLists} from '~/shared/typings'

export const tabListsState = atom<TabLists>({
  key: 'tabListsState',
  default: selector<TabLists>({
    key: 'tabListsState/Default',
    get: async ({get}) => {
      const lists = await getAllTabLists()
      if (typeof lists === 'undefined') {
        return [] as TabLists
      }
      return lists
    },
  }),
})

export const tabListState = atomFamily<TabListElem, number>({
  key: 'tabListState',
  default: selectorFamily<TabListElem, number>({
    key: 'tabListState/Default',
    get: (idx: number) => async ({get}) => {
      const lists = await get(sortTabListsState)
      return lists[idx]
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

/**
 * Selector for tabLists stats
 * Ref: https://recoiljs.org/docs/basic-tutorial/selectors
 */
export const tabListsStatsState = selector({
  key: 'tabListsStatsState',
  get: async ({get}) => {
    const tabLists = await get(tabListsState)
    if (!tabLists.length) {
      return 0
    }
    return 100
    // // TODO: promises?
    // const tabListElems = tabLists.map((tabList, idx) => get(tabListState(idx)))
    // const totalCount = tabListElems
    //   .map((tabList) => tabList.tabs.length)
    //   .reduce((prev, cur) => prev + cur)

    // return totalCount
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

///////////////////////////
// producer
///////////////////////////

export const removeTabLink = (
  tabLists: TabLists,
  tabListId: number,
  tabId: number,
) =>
  produce(tabLists, (draft: Draft<TabLists>) => {
    const targetTabList = draft.filter((list) => list.id === tabListId)[0]
    const idx = targetTabList.tabs.findIndex(({id}) => id === tabId)
    targetTabList.tabs = targetTabList.tabs.filter((_, i) => i !== idx)
  })

export const removeTab = (tabList: TabListElem, tabId: number) =>
  produce(tabList, (draft: Draft<TabListElem>) => {
    const newTabs = draft.tabs.filter((tab) => tab.id !== tabId)
    draft.tabs = newTabs
  })
