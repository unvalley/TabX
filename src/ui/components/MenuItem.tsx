import { Popover } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'

import { Spacing } from '~/ui/constants/styles'

const Label = styled.span`
  margin-left: ${Spacing['2']} !important;
`

type Props = { onClick: () => void; label: string; icon: JSX.Element }
export const MenuItem: React.FC<Props> = props => (
  <Popover.Item onClick={props.onClick} style={{ cursor: 'pointer' }}>
    {props.icon}
    <Label>{props.label}</Label>
  </Popover.Item>
)
