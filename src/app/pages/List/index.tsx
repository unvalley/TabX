import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { useImmer } from 'use-immer'
import { Load } from '~/app/components/atoms/Load'
import { tabListsState } from '~/app/stores/tabLists'
import { getAllFlatTabs } from '~/shared/storage'
import { TabList, TabSimple } from '~/shared/typings'
import { List as Component } from './List'

export const List: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const tabLists = useRecoilValue<TabList[]>(tabListsState)
  const [tabs, updateTabs] = useImmer<TabSimple[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      await getAllFlatTabs().then(res => updateTabs(res))
    }
    fetchData()
      .then(() => setHasLoaded(true))
      .catch(err => console.error(err))
  }, [])

  return !hasLoaded ? (
    <Load />
  ) : tabLists.length > 0 ? (
    <Component tabLists={tabLists} tabs={tabs} />
  ) : (
    <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
  )
}
