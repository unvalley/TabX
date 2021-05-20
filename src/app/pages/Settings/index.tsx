import { Spacer, useToasts } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Header } from '~/app/components/organisms/Header'
import { Languages, Tabs } from '~/app/components/organisms/SettingsSection'
import { tabListsState } from '~/app/stores/tabLists'
import { TAB_LISTS } from '~/shared/constants'
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
      <Header text={'TabX'} />
      <Spacer y={1} />
      <Languages />
      <Spacer y={1} />
      <Tabs deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
    </>
  )
}
