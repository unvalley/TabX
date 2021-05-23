import { atom, selector } from 'recoil'

import { getAllFlatTabs } from '~/shared/storage'
import { TabSimple } from '~/shared/typings'

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
