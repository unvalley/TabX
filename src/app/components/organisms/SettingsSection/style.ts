import {Toggle} from '@geist-ui/react'
import styled from 'styled-components'
import {Spacing} from '../../../constants/styles'

export const ToggleWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`

export const StyledToggle = styled(Toggle).attrs({
  size: 'large',
})`
  margin: ${Spacing['2']};
`
