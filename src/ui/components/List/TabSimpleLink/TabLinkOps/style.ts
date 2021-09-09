import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

export const OpsWrapper = styled.section<{ opacity: number }>`
  opacity: ${({ opacity }) => opacity};
  transition: all 0.3s ease;
`

export const OpsElement = styled.span<{ bg: string }>`
  cursor: pointer;
  font-size: 12px;
  vertical-align: middle;
  padding: ${Spacing['0.5']};
  margin-left: 2px;
  border-radius: 33px;
  z-index: 2;
  &:hover {
    background-color: ${({ bg }) => bg};
    box-shadow: 10;
    opacity: 0.9;
  }
`
