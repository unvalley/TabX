import { Spacer, useTheme, useToasts } from '@geist-ui/react'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater, useRecoilState } from 'recoil'

import { tabService } from '~/core/services'
import { APP_NAME } from '~/core/shared/constants'
import { TabList } from '~/core/shared/typings'
import { Header } from '~/ui/components/Header'
import { Load } from '~/ui/components/Load'
import { Spacing } from '~/ui/constants/styles'
import { tabListsState } from '~/ui/stores/tabLists'

import { Languages } from '../../components/Settings/Languages'
import { Tabs } from '../../components/Settings/Tabs'

const useDeleteAllTabs = (setTabLists: SetterOrUpdater<TabList[]>) => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await tabService
        .deleteAllTabList()
        .then(() => setTabLists([] as TabList[]))
        .then(() => {
          setToast({
            text: t('DELETED_ALL_TABS'),
          })
        })
        .catch(err => console.error(err))
    }
  }
  return deleteAllTabs
}

const useCountTotalTabs = (setTabLists: SetterOrUpdater<TabList[]>) => {
  const [hasCountedTotalTabs, setHasCountedTotalTabs] = useState(false)
  useLayoutEffect(() => {
    try {
      const resetTabLists = async () => {
        const tabLists = await tabService.getAllTabList()
        setTabLists(tabLists)
      }
      resetTabLists().then(() => setHasCountedTotalTabs(true))
    } catch (err) {
      console.error(err)
    }
  }, [])
  return { hasCountedTotalTabs }
}

export const Settings: React.FC = () => {
  const theme = useTheme()

  const [tabLists, setTabLists] = useRecoilState(tabListsState)
  // HACK: this is for count totalTabs. Not efficient, needs refactor
  const { hasCountedTotalTabs } = useCountTotalTabs(setTabLists)
  const deleteAllTabs = useDeleteAllTabs(setTabLists)

  if (!hasCountedTotalTabs) {
    return (
      <div style={{ margin: `${Spacing[5]} auto` }}>
        <Load />
      </div>
    )
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
