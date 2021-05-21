import { useTheme } from '@geist-ui/react'
import X from '@geist-ui/react-icons/x'
import React from 'react'
import { Rule } from '~/ui/constants/styles'
import { OpsElement, OpsWrapper } from './style'

type Props = {
  tabId: number
  onClick: (tabId: number) => Promise<void>
  isVisible: boolean
}

export const TabLinkOps: React.FC<Props> = ({ tabId, isVisible, onClick }) => {
  const theme = useTheme()

  return (
    <OpsWrapper opacity={isVisible ? 10 : 0}>
      <OpsElement bg={theme.palette.accents_1} onClick={() => onClick(tabId)}>
        <X size={Rule.TAB_LINKS_ELEM_SIZE} />
      </OpsElement>
    </OpsWrapper>
  )
}
