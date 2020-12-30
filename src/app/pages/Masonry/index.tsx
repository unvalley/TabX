import React from 'react'
import {useRecoilState} from 'recoil'
import {getAllTabLists} from '../../../shared/storage'
import {TabLists} from '../../../shared/typings'
import {tabListsState} from '../../store'
import {Masonry as Component} from './Masonry'

export const Masonry: React.FC = () => {
  // TODO: stateから取得するように変更
  const [tabLists, setTabLists] = useRecoilState<TabLists>(tabListsState)

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      setTabLists(lists)
    }
    cleanup()
  }, [])

  return tabLists ? <Component tabLists={tabLists} /> : null
}
