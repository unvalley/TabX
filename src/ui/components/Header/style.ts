import { Text } from '@geist-ui/react'
import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

export const PageHeaderText = styled(Text).attrs({
  size: '1.5rem',
})`
  display: inline-block;
  font-weight: bold;
  &:hover {
    color: #0d7fe0;
  }
`

export const _Div = styled.div<{ color: string; bgColor: string }>`
  cursor: pointer;
  border-radius: 50%;
  padding: ${Spacing['2']};
  vertical-align: middle;
  line-height: 0;
  display: inline-block;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
  }
`
