import styled from 'styled-components'

import { Colors, Spacing } from '~/ui/constants/styles'

export const TabLinkWrapper = styled.span<{
  bg: string
  hoverShadow: string
}>`
  margin: ${Spacing['0.5']};
  padding: ${Spacing['0.5']} 6px ${Spacing['0.5']} ${Spacing['3']};
  cursor: pointer;
  border-radius: 33px;
  box-shadow: 0px 20px 35px -16px ${Colors.SHADOW};
  background-color: ${({ bg }) => bg};
  justify-content: center;
  display: inline-flex;
  text-align: center;
  transition: all 0.4s ease;
  &:hover {
    box-shadow: ${({ hoverShadow }) => hoverShadow};
    opacity: 0.9;
  }
`

export const TabLinkButton = styled.a<{ color: string }>`
  color: ${({ color }) => color};
  justify-content: center;
  text-align: center;
  text-decoration: none;
  line-height: 1.5;
  display: inline-flex;
  z-index: 1;
`

export const Title = styled.span`
  word-break: break-all;
  font-size: 12px;
`
