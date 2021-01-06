import {useTheme} from '@geist-ui/react'
import {X} from '@geist-ui/react-icons'
import React from 'react'
import {TAB_LINKS_ELEM_SIZE} from '../../../constants/styles'
import {OpsElement, OpsWrapper} from './style'

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
        <X size={TAB_LINKS_ELEM_SIZE} />
      </OpsElement>
    </OpsWrapper>
  )
}
