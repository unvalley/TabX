import React from 'react'
import { useRecoilValue } from 'recoil'
import { Load } from '~/app/components/atoms/Load'
import { domainTabListsState } from '~/app/store/domainTabLists'
import { DomainTabList } from '~/shared/typings'
import { Domain as Component } from './Domain'

export const Domain: React.FC = () => {
  const tabLists = useRecoilValue<DomainTabList[]>(domainTabListsState)

  return tabLists ? <Component tabLists={tabLists} /> : <Load />
}
