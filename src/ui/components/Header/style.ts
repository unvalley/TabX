import styled from 'styled-components'
import { Row, Text } from '@geist-ui/react'
import { Spacing } from '~/ui/constants/styles'

export const PageHeaderText = styled(Text).attrs({
  size: '1.5rem',
})`
  display: inline-block;
  font-weight: bold;
  &:hover {
    color: #5ce1e6;
  }
`

export const HeaderRow = styled(Row).attrs({
  align: 'middle',
})`
  height: 100%;
  text-align: 'center';
`

export const _Div = styled.div<{ color: string; bgColor: string }>`
  cursor: pointer;
  border-radius: 50%;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  transition: all 0.3s ease;
  &:hover {
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
  }
`
