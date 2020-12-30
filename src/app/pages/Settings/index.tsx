import React from 'react'
import {deleteAllTabLists} from '../../../shared/storage'
import {Settings as Component} from './Settings'

export const Settings: React.FC = () => {
  const deleteAllTabs = () => deleteAllTabLists()

  return <Component deleteAllTabs={deleteAllTabs} />
}
