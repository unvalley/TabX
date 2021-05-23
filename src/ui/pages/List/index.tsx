import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { TabList, TabSimple } from '~/shared/typings'
import { Load } from '~/ui/components/Load'
import { tabListsState } from '~/ui/stores/tabLists'
import { tabsState } from '~/ui/stores/tabs'

import { List as Component } from './List'

export const List: React.VFC = () => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const tabLists = useRecoilValue<TabList[]>(tabListsState)
  const tabs = useRecoilValue<TabSimple[]>(tabsState)

  const { t } = useTranslation()

  useEffect(() => {
    setHasLoaded(true)
  }, [])

  return !hasLoaded ? (
    <Load />
  ) : tabLists.length > 0 ? (
    <Component tabLists={tabLists} tabs={tabs} />
  ) : (
    <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
  )
}
