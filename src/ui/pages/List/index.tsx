import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { TabList, TabSimple } from '~/shared/typings'
import { tabListsState } from '~/ui/stores/tabLists'
import { tabsState } from '~/ui/stores/tabs'

import { List as Component } from './List'

export const List: React.VFC = () => {
  const tabLists = useRecoilValue<TabList[]>(tabListsState)
  const tabs = useRecoilValue<TabSimple[]>(tabsState)

  const { t } = useTranslation()

  console.log(tabLists)

  return tabLists.length > 0 ? <Component tabLists={tabLists} tabs={tabs} /> : <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
}
