import { Popover } from '@geist-ui/react'
import { MoreVertical } from '@geist-ui/react-icons'
import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

export const _MoreVerticalIcon = styled(MoreVertical)`
  border-radius: 20px;
`

export const _Popover = styled(Popover)<{ $color: string; $bgColor: string }>`
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
