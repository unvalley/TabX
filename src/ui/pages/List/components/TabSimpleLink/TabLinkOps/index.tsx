import { useTheme } from '@geist-ui/react'
import React from 'react'
import { isDark } from '~/ui/utils'

import { OpsElement, OpsWrapper } from './style'

type Props = {
  tabId: number
  onClick: (tabId: number) => Promise<void>
  isVisible: boolean
}

export const TabLinkOps: React.FC<Props> = ({ tabId, isVisible, onClick, children }) => {
  const theme = useTheme()
  return (
    <OpsWrapper opacity={isVisible ? 10 : 0}>
      <OpsElement bg={theme.palette.accents_1} onClick={() => onClick(tabId)}>
        {children}
      </OpsElement>
    </OpsWrapper>
  )
}
