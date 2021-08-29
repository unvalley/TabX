import { atom, selector } from 'recoil'

import { tabService } from '~/core/services'
import { TabSimple } from '~/core/shared/typings'

export const tabsState = atom<TabSimple[]>({
  key: 'tabsState',
  default: selector<TabSimple[]>({
    key: 'tabsState/Default',
    get: async () => {
      const lists = await tabService.getAllSimpleTab()
      if (typeof lists === 'undefined') return []
      return lists
    },
  }),
})
