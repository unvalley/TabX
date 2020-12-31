import {Popover} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {Spacing} from '../../constants/styles'

export const Item = styled.span`
  margin-left: ${Spacing['2']} !important;
`

type Props = {handleClick: () => void; label: string; icon: JSX.Element}
export const MenuItem: React.FC<Props> = (props) => (
  <Popover.Item onClick={props.handleClick} style={{cursor: 'pointer'}}>
    {props.icon}
    <Item>{props.label}</Item>
  </Popover.Item>
)
