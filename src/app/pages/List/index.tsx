import React from 'react'
import {useImmer} from 'use-immer'
import {getAllTabLists} from '../../../shared/storage'
import {TabLists} from '../../../shared/typings'
import {List as Component} from './List'

export const List: React.FC = () => {
  const [tabLists, updateTabLists] = useImmer<TabLists>([])

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      updateTabLists((draft) => [...lists.reverse()])
    }
    cleanup()
  }, [tabLists])

  return <Component tabLists={tabLists} />
}
