import styled from 'styled-components'
import { Row, Text } from '@geist-ui/react'

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
