import { atomFamily, selectorFamily } from 'recoil'
import { TabList } from '~/shared/typings'
import { sortTabListsState } from './tabLists'

/**
 * Children TabListState
 */
export const tabListState = atomFamily<TabList, number>({
  key: 'tabListState',
  default: selectorFamily<TabList, number>({
    key: 'tabListState/Default',
    get: (idx: number) => async ({ get }) => {
      const lists = await get(sortTabListsState)
      return lists[idx]
    },
  }),
})

export const tabListTotalCount = selectorFamily({
  key: 'tabListTotalCount',
  get: (idx: number) => async ({ get }) => {
    const tabList = await get(tabListState(idx))
    const tabs = tabList.tabs
    return !tabs || !tabs.length ? 0 : tabs.length
  },
})

// redux-toolkit

// type TabListsState = { data: TabList[] }
// const initialState: TabListsState = { data: [] }

// export const fetchTabLists = createAsyncThunk('fetchTabLists', async () => {
//   const result = await getAllLists(TAB_LISTS)
//   return result
// })

// const tabListsSlice = createSlice({
//   name: 'tabLists',
//   initialState: [] as TabList[],
//   reducers: {
//     setTabLists: (state, action: PayloadAction<TabList[]>) => {
//       state = action.payload
//       return state
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchTabLists.fulfilled, (state, action) => {
//       state.push(...action.payload)
//     })
//   },
// })

// export const tabListsReducer = tabListsSlice.reducer
// export const { setTabLists } = tabListsSlice.actions
