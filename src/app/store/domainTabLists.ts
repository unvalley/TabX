import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { DOMAIN_TAB_LISTS } from '~/shared/constants'
import { getAllLists } from '~/shared/storage'
import { DomainTabList } from '~/shared/typings'

export const domainTabListsState = atom<DomainTabList[]>({
  key: 'domainTabListsState',
  default: selector<DomainTabList[]>({
    key: 'tabListsState/Default',
    get: async () => {
      const lists = await getAllLists(DOMAIN_TAB_LISTS)
      if (typeof lists === 'undefined') {
        return []
      }
      return lists
    },
  }),
})

export const domainTabListState = atomFamily<DomainTabList, number>({
  key: 'domainTabListState',
  default: selectorFamily<DomainTabList, number>({
    key: 'domainTabListState/Default',
    get: (idx: number) => async ({ get }) => {
      const lists = await get(domainTabListsState)
      return lists[idx]
    },
  }),
})
