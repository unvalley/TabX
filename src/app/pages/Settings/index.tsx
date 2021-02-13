import { useToasts } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { tabListsState } from '~/app/store'
import { TAB_LISTS } from '~/shared/constants'
import { deleteAllLists } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { Settings as Component } from './Settings'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()
  const setTabLists = useSetRecoilState(tabListsState)

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await deleteAllLists(TAB_LISTS)
        .then(() => setTabLists([{}] as TabList[]))
        .catch(err => console.error(err))
    }
    setToast({
      text: t('DELETED_ALL_TABS'),
    })
  }

  return <Component deleteAllTabs={deleteAllTabs} />
}
