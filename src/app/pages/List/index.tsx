import React from 'react'
import { useRecoilValue } from 'recoil'
import { Load } from '~/app/components/atoms/Load'
import { sortTabListsState } from '~/app/store'
import { TabList } from '~/shared/typings'
import { List as Component } from './List'

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
