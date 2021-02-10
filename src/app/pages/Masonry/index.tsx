import React from 'react'
import { useRecoilValue } from 'recoil'
import { TabList } from '../../../shared/typings'
import { Load } from '../../components/atoms/Load'
import { tabListsState } from '../../store'
import { Masonry as Component } from './Masonry'

export const Masonry: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(tabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
