import { Spacer, useTheme, useToasts } from '@geist-ui/react'
import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater, useRecoilState } from 'recoil'

import { tabService } from '~/core/services'
import { APP_NAME } from '~/core/shared/constants'
import { TabList } from '~/core/shared/typings'
import { Header } from '~/ui/components/Header'
import { tabListsState } from '~/ui/stores/tabLists'

import { Languages } from '../../components/Settings/Languages'
import { Tabs } from '../../components/Settings/Tabs'

// HACK: this is for count totalTabs. not efficient, needs refactor
const useRevalidate = (setTabLists: SetterOrUpdater<TabList[]>) => {
  useLayoutEffect(() => {
    try {
      const resetTabLists = async () => {
        const tabLists = await tabService.getAllTabList()
        setTabLists(tabLists)
      }
      resetTabLists()
    } catch (err) {
      console.error(err)
    }
  }, [])
}

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()
  const [tabLists, setTabLists] = useRecoilState(tabListsState)

  const theme = useTheme()

  useRevalidate(setTabLists)

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await tabService
        .deleteAllTabList()
        .then(() => setTabLists([] as TabList[]))
        .then(() =>
          setToast({
            text: t('DELETED_ALL_TABS'),
          }),
        )
        .catch(err => console.error(err))
    }
  }

  return (
    <>
      <Header text={APP_NAME} />
      <Languages backgroundColor={theme.palette.accents_1} />
      <Spacer y={1} />
      <Tabs backgroundColor={theme.palette.accents_1} deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
    </>
  )
}
