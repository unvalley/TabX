import {getAllTabLists} from '@shared/storage'
import {TabLists} from '@shared/typings'
import produce from 'immer'
import {atom} from 'recoil'

// export const tabLists: TabLists = []

// export const loadedTabLists = produce(tabLists, async (draft) => {
//   const lists = await getAllTabLists()
//   draft = lists.reverse()
// })

export const tabListsState = atom<TabLists>({
  key: 'tabLists',
  default: [],
})
