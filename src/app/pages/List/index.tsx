import React from 'react'
import {useRecoilValue} from 'recoil'
import {TabLists} from '../../../shared/typings'
import {Load} from '../../components/atoms/Load'
import {sortTabListsState} from '../../store'
import {List as Component} from './List'

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabLists>(sortTabListsState)
  // const tabLists = useRecoilValue(tabListsQuery)

  const [query, setQuery] = React.useState('')

  //   const searchResults = fuzzySearch(query)(tabLists)

  return tabLists ? (
    <Component tabLists={tabLists} query={query} setQuery={setQuery} />
  ) : (
    <Load />
  )
}
