import { atom, selector } from 'recoil'

import { tabService } from '~/backend/services'
import { TabSimple } from '~/backend/shared/typings'

export const tabsState = atom<TabSimple[]>({
  key: 'tabsState',
  default: selector<TabSimple[]>({
    key: 'tabsState/Default',
    get: async () => {
      const lists = await tabService.getAllSimpleTab()
      if (typeof lists === 'undefined') {
        return []
      }
      return lists
    },
  }),
})
