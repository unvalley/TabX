import { atom, selector } from 'recoil'
import { TabSimple } from '~/shared/typings'
import { getAllFlatTabs } from '~/shared/storage'

export const tabsState = atom<TabSimple[]>({
  key: 'tabsState',
  default: selector<TabSimple[]>({
    key: 'tabsState/Default',
    get: async () => {
      const lists = await getAllFlatTabs()
      if (typeof lists === 'undefined') {
        return []
      }
      return lists
    },
  }),
})
