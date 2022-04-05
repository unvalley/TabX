import { Grid } from '@geist-ui/react'
import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

// FIXME
export const ContentWrapper = styled(Grid.Container)<{ bg: string }>`
  margin: 0px 100px;
  display: flex;
  min-height: 100vh;
  position: relative;
  background-color: ${({ bg }) => bg};
`

export const MainContainer = styled.main`
  margin: ${Spacing['5']} auto;
  max-width: 70%;
  flex: 1 1 0%;
  order: 2;
  position: relative;
  flex-direction: column;
  padding-bottom: 8rem;
`
