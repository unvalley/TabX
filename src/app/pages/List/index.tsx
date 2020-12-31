import {Spinner} from '@geist-ui/react'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {Spacing} from '../../constants/styles'
import {tabListsState} from '../../store'
import {List as Component} from './List'

export const List: React.FC = () => {
  const tabLists = useRecoilValue(tabListsState)

  return tabLists !== [] ? (
    <Component tabLists={tabLists} />
  ) : (
    <Spinner size="large" style={{margin: `${Spacing[5]} auto`}} />
  )
}
