import React from 'react'
import { useTranslation } from 'react-i18next'
import { TAB_LISTS } from '~/shared/constants'
import { deleteAllLists } from '~/shared/storage'
import { Settings as Component } from './Settings'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const deleteAllTabs = () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      deleteAllLists(TAB_LISTS)
    }
  }

  return <Component deleteAllTabs={deleteAllTabs} />
}
