import {Tooltip} from '@geist-ui/react'
import {Pin, X} from '@geist-ui/react-icons'
import {Tabs} from 'webextension-polyfill-ts'
import React from 'react'
import {Spacing, TAB_LINKS_ELEM_SIZE} from '../../../constants/styles'

type Props = {onDelete: any; tab: Tabs.Tab}
export const TabLinkOps: React.FC<Props> = (props) => (
  <>
    <Tooltip text={<>Pin</>}>
      <span
        style={{
          cursor: 'pointer',
          backgroundColor: 'red',
          padding: Spacing['0.5'],
          borderRadius: '33px',
          zIndex: 2,
        }}
        onClick={() => props.onDelete(props.tab.id!)}
      >
        <Pin size={TAB_LINKS_ELEM_SIZE} />
      </span>
    </Tooltip>

    <Tooltip text={<>Delete</>}>
      <span
        style={{
          cursor: 'pointer',
          backgroundColor: 'blue',
          padding: Spacing['0.5'],
          borderRadius: '33px',
          zIndex: 100,
        }}
        onClick={() => props.onDelete(props.tab.id!)}
      >
        <X size={TAB_LINKS_ELEM_SIZE} />
      </span>
    </Tooltip>
  </>
)
