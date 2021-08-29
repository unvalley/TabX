import React from 'react'
import { useRecoilValue } from 'recoil'

import { TabList, TabSimple } from '~/core/shared/typings'
import { tabListsState } from '~/ui/stores/tabLists'
import { tabsState } from '~/ui/stores/tabs'

import { List as Component } from './List'

export const List: React.VFC = () => {
  const tabLists = useRecoilValue<TabList[]>(tabListsState)
  const tabs = useRecoilValue<TabSimple[]>(tabsState)

  return <Component tabLists={tabLists} tabs={tabs} />
}
