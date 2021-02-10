import React from 'react'
import { useTranslation } from 'react-i18next'
import { deleteAllTabLists } from '../../../shared/storage'
import { Settings as Component } from './Settings'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const deleteAllTabs = () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      deleteAllTabLists()
    }
  }

  return <Component deleteAllTabs={deleteAllTabs} />
}
