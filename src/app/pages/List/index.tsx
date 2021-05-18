import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import { Load } from '~/app/components/atoms/Load'
import { TAB_LISTS } from '~/shared/constants'
import { getAllFlatTabs, getAllLists } from '~/shared/storage'
import { TabList, TabSimple } from '~/shared/typings'
import { List as Component } from './List'

export const List: React.FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [tabLists, updateTabLists] = useImmer<TabList[]>([])
  const [tabs, updateTabs] = useImmer<TabSimple[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      await getAllLists(TAB_LISTS).then(res => updateTabLists(res))
      await getAllFlatTabs().then(res => updateTabs(res))
    }
    fetchData()
      .then(() => setHasLoaded(true))
      .catch(err => console.error(err))
  }, [])

  return !hasLoaded ? (
    <Load />
  ) : tabLists.length >= 1 ? (
    <Component tabLists={tabLists} tabs={tabs} />
  ) : (
    <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
  )
}
