import { Toggle } from '@geist-ui/react'
import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

export const ToggleWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`

export const _Toggle = styled(Toggle).attrs({
  size: 'large',
})`
  margin: ${Spacing['2']};
`
