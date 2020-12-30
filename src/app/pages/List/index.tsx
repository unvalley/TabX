import React from 'react'
import {useRecoilState} from 'recoil'
import {getAllTabLists} from '../../../shared/storage'
import {TabLists} from '../../../shared/typings'
import {tabListsState} from '../../store'
import {List as Component} from './List'

export const List: React.FC = () => {
  const [tabLists, setTabLists] = useRecoilState<TabLists>(tabListsState)

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      setTabLists(lists)
    }
    cleanup()
  }, [])

  return <Component tabLists={tabLists} />
}
