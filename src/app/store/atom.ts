import {atom} from 'recoil'
import {TabLists} from '../../shared/typings'

export const tabListsState = atom<TabLists>({
  key: 'tabLists',
  default: [],
})
