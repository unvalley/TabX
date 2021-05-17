import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import { Load } from '~/app/components/atoms/Load'
import { TAB_LISTS } from '~/shared/constants'
import { getAllLists } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { List as Component } from './List'

export const List: React.FC = () => {
  const [tabLists, updateTabLists] = useImmer<TabList[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllLists(TAB_LISTS)
      updateTabLists(res)
    }
    fetchData()
  }, [])

  return tabLists.length >= 1 ? (
    <Component tabLists={tabLists} />
  ) : tabLists.length === 0 ? (
    <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
  ) : (
    <Load />
  )
}
