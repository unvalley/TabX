import {Spinner} from '@geist-ui/react'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {TabLists} from '../../../shared/typings'
import {Spacing} from '../../constants/styles'
import {sortTabListsState, tabListsState} from '../../store'
import {List as Component} from './List'

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabLists>(sortTabListsState)

  return tabLists !== [] ? (
    <Component tabLists={tabLists} />
  ) : (
    <Spinner size="large" style={{margin: `${Spacing[5]} auto`}} />
  )
}
