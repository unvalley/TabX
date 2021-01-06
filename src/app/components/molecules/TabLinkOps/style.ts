import styled from 'styled-components'
import {Spacing} from '../../../constants/styles'

export const OpsWrapper = styled.section<{opacity: number}>`
  opacity: ${({opacity}) => opacity};
  transition: all 0.3s ease;
`

export const OpsElement = styled.span<{bgColor: string}>`
  cursor: pointer;
  font-size: 12px;
  padding: ${Spacing['0.5']};
  margin-left: 2px;
  border-radius: 33px;
  z-index: 2;
  &:hover {
    background-color: ${({bgColor}) => bgColor};
    box-shadow: 10;
    opacity: 0.9;
  }
`
