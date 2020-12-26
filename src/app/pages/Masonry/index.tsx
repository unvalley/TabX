import React from 'react'
import {useRecoilState} from 'recoil'
import {getAllTabLists} from '../../../shared/storage'
import {TabLists} from '../../../shared/typings'
import {tabListsState} from '../../store'
import {Masonry as Component} from './Masonry'

export const Masonry: React.FC = () => {
  const [tabLists, setTabLists] = useRecoilState<TabLists>(tabListsState)

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      setTabLists(lists)
    }
    cleanup()
  }, [tabLists])

  return <Component tabLists={tabLists} />
}
