import React from 'react'
import { useRecoilValue } from 'recoil'
import { Load } from '~/app/components/atoms/Load'
import { sortTabListsState } from '~/app/store'
import { TabList } from '~/shared/typings'
import { Domain as Component } from './Domain'

export const Domain: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
