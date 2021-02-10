import React from 'react'
import { deleteAllTabLists } from '../../../shared/storage'
import { Settings as Component } from './Settings'
import { useTranslation } from 'react-i18next'

export const Settings: React.FC = () => {
  const [t, _] = useTranslation()
  const deleteAllTabs = () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      deleteAllTabLists()
    }
  }

  return <Component deleteAllTabs={deleteAllTabs} />
}
