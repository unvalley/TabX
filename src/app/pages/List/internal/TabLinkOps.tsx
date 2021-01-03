import {X} from '@geist-ui/react-icons'
import React from 'react'
import styled from 'styled-components'
import {Spacing, TAB_LINKS_ELEM_SIZE} from '../../../constants/styles'

const OpsWrapper = styled.section<{opacity: number}>`
  opacity: ${({opacity}) => opacity};
  transition: all 0.3s ease;
`

const OpsElement = styled.span<{bgColor: string}>`
  cursor: pointer;
  font-size: 10px;
  padding: ${Spacing['0.5']};
  border-radius: 33px;
  z-index: 2;
`

type Props = {
  tabId: number
  handleDelete: (tabId: number) => Promise<void>
  shouldShow?: boolean
}
export const TabLinkOps: React.FC<Props> = (props) => {
  return (
    <OpsWrapper opacity={props.shouldShow ? 10 : 0}>
      <OpsElement
        bgColor={'yellow'}
        onClick={() => props.handleDelete(props.tabId)}
      >
        <X size={TAB_LINKS_ELEM_SIZE} />
      </OpsElement>
    </OpsWrapper>
  )
}
