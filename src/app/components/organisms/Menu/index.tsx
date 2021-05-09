import { Popover, useTheme } from '@geist-ui/react'
import { MoreVertical } from '@geist-ui/react-icons'
import React from 'react'
import styled from 'styled-components'
import { Spacing } from '~/app/constants/styles'
import { MenuContent } from '../../molecules/HeaderMenuContent'

export const StyledMoreVertical = styled(MoreVertical)`
  border-radius: 20px;
`

const StyledPopover = styled(Popover)<{ color: string; bgColor: string }>`
  cursor: pointer;
  border-radius: 50%;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  transition: all 0.3s ease;
  &:hover {
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
  }
`

export const Menu: React.VFC = () => {
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  return (
    <StyledPopover content={<MenuContent />} color={popoverColor} bgColor={popoverBgColor}>
      <StyledMoreVertical />
    </StyledPopover>
  )
}
