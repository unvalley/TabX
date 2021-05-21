import { Spacer, useToasts } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Header } from '~/ui/components/Header'
import { Languages } from './components/Languages'
import { Tabs } from './components/Tabs'
import { tabListsState } from '~/ui/stores/tabLists'
import { APP_NAME, TAB_LISTS } from '~/shared/constants'
import { deleteAllLists } from '~/shared/storage'
import { TabList } from '~/shared/typings'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()
  const [tabLists, setTabLists] = useRecoilState(tabListsState)

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await deleteAllLists(TAB_LISTS)
        .then(() => {
          setTabLists([{}] as TabList[])
        })
        .then(() => {
          setToast({
            text: t('DELETED_ALL_TABS'),
          })
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <>
      <Header text={APP_NAME} />
      <Spacer y={1} />
      <Languages />
      <Spacer y={1} />
      <Tabs deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
    </>
  )
}
