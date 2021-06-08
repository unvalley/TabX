import { Spacer, useTheme, useToasts } from '@geist-ui/react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { APP_NAME, TAB_LISTS } from '~/shared/constants'
import { deleteAllLists, getAllLists } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { Header } from '~/ui/components/Header'
import { tabListsState } from '~/ui/stores/tabLists'

import { Languages } from './components/Languages'
import { Tabs } from './components/Tabs'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()
  const [tabLists, setTabLists] = useRecoilState(tabListsState)

  const theme = useTheme()

  // HACK: this is for count totalTabs.
  // not efficient, needs refactor
  useEffect(() => {
    try {
      const resetTabLists = async () => {
        const tabLists = await getAllLists(TAB_LISTS)
        setTabLists(tabLists)
      }
      resetTabLists()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await deleteAllLists(TAB_LISTS)
        .then(() => setTabLists([] as TabList[]))
        .then(() => {
          setToast({
            text: t('DELETED_ALL_TABS'),
          })
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div>
      <Header text={APP_NAME} />
      <Languages backgroundColor={theme.palette.accents_1} />
      <Spacer y={1} />
      <Tabs backgroundColor={theme.palette.accents_1} deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
    </div>
  )
}
