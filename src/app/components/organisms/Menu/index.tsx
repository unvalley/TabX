import { Popover, useTheme } from '@geist-ui/react'
import { MoreVertical } from '@geist-ui/react-icons'
import React from 'react'
import styled from 'styled-components'
import { Spacing } from '~/app/constants/styles'
import { MenuContent } from '../../molecules/HeaderMenuContent'

export const StyledMoreVertical = styled(MoreVertical)`
  border-radius: 20px;
`

const StyledPopover = styled(Popover)<{ $color: string; $bgColor: string }>`
  cursor: pointer;
  border-radius: 50%;
  padding: ${Spacing['2']};
  transition: all 0.3s ease;
  line-height: 0;
  &:hover {
    color: ${props => props.color};
    background-color: ${props => props.$bgColor};
  }
`

export const Menu: React.VFC = () => {
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  return (
    <StyledPopover content={<MenuContent />} $color={popoverColor} $bgColor={popoverBgColor}>
      <StyledMoreVertical />
    </StyledPopover>
  )
}
