import styled from 'styled-components'
import { Text } from '@geist-ui/react'

export const PageHeaderText = styled(Text).attrs({
  size: '1.5rem',
})`
  display: inline-block;
  font-weight: bold;
  &:hover {
    color: #5ce1e6;
  }
`
