import {useTheme} from '@geist-ui/react'
import React from 'react'
import {deleteAllTabLists} from '../../../shared/storage'
import {useConfigs} from '../../utils/config-context'
import {Settings as Component} from './Settings'

export const Settings: React.FC = () => {
  const deleteAllTabs = () => deleteAllTabLists()
  const configs: any = useConfigs()
  const theme = useTheme()
  const isDark = React.useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = () => {
    configs.changeHandle(theme.type)
  }

  return (
    <Component
      isDark={isDark}
      switchTheme={switchTheme}
      deleteAllTabs={deleteAllTabs}
    />
  )
}
