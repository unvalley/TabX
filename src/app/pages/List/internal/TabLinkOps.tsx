import {useTheme} from '@geist-ui/react'
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

type Props = {
  tabId: number
  handleDelete: (tabId: number) => Promise<void>
  shouldShow: boolean
}
export const TabLinkOps: React.FC<Props> = (props) => {
  const theme = useTheme()
  return (
    <OpsWrapper opacity={props.shouldShow ? 10 : 0}>
      <OpsElement
        bgColor={theme.palette.accents_2}
        onClick={() => props.handleDelete(props.tabId)}
      >
        <X size={TAB_LINKS_ELEM_SIZE} style={{verticalAlign: 'text-top'}} />
      </OpsElement>
    </OpsWrapper>
  )
}
