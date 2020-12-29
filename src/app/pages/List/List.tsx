import React from 'react'
import {TabLists} from '../../../shared/typings'
import {TabGroups} from './internal/TabGroups'

type Props = {
  tabLists: TabLists
}

export const List: React.FC<Props> = ({tabLists}) => {
  return tabLists ? <TabGroups tabLists={tabLists} /> : null
}
