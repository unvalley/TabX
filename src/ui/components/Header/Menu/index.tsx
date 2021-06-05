import { useTheme } from '@geist-ui/react'
import React from 'react'

import { MenuContent } from './MenuContent'
import { _Popover, _MoreVerticalIcon } from './style'

export const Menu: React.VFC = () => {
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  return (
    <_Popover content={<MenuContent />} $color={popoverColor} $bgColor={popoverBgColor}>
      <_MoreVerticalIcon />
    </_Popover>
  )
}
