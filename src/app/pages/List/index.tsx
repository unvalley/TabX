import React from 'react'
import { useRecoilValue } from 'recoil'
import { TabList } from '../../../shared/typings'
import { Load } from '../../components/atoms/Load'
import { sortTabListsState } from '../../store'
import { List as Component } from './List'

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
