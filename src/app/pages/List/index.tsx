import Fuse from 'fuse.js'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {TabLists} from '../../../shared/typings'
import {Load} from '../../components/atoms/Load'
import {sortTabListsState} from '../../store'
import {List as Component} from './List'

const fuzzySearch = (query: string) => (tabLists: TabLists) => {
  const fuse = new Fuse(tabLists, {
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.3,
    keys: ['tabs.title'],
  })
  const results = fuse.search(query)
  const searchResults = query
    ? results.map((char) => {
        return char.item
      })
    : tabLists
  return searchResults
}

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabLists>(sortTabListsState)
  const [query, setQuery] = React.useState('')

  const searchResults = fuzzySearch(query)(tabLists)

  return tabLists ? (
    <Component tabLists={searchResults} query={query} setQuery={setQuery} />
  ) : (
    <Load />
  )
}
