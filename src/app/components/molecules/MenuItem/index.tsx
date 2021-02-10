import { Popover } from '@geist-ui/react'
import React from 'react'
import { Label } from './style'

type Props = { handleClick: () => void; label: string; icon: JSX.Element }
export const MenuItem: React.FC<Props> = props => (
  <Popover.Item onClick={props.handleClick} style={{ cursor: 'pointer' }}>
    {props.icon}
    <Label>{props.label}</Label>
  </Popover.Item>
)
