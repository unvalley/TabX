import React from 'react'
import {TabLists} from '../../../shared/typings'
import {TabGroups} from '../List/internal/TabGroups'

type Props = {
  tabLists: TabLists
}

export const Masonry: React.FC<Props> = (props) => {
  return <TabGroups tabLists={props.tabLists} />
}
