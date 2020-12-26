// export {tabListsState} from './atom'

import {TabLists} from '@shared/typings'

export const initialState: TabLists = []

export function reducer(draft: any, action: any) {
  switch (action.type) {
    case 'remove':
      return initialState
  }
}
