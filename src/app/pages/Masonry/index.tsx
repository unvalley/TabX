import React from 'react'
import { useRecoilValue } from 'recoil'
import { Load } from '~/app/components/atoms/Load'
import { tabListsState } from '~/app/store'
import { TabList } from '~/shared/typings'
import { Masonry as Component } from './Masonry'

export const Masonry: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(tabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
