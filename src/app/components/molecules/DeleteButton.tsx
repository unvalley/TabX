import {Button} from '@geist-ui/react'
import {AlertCircle} from '@geist-ui/react-icons'
import React from 'react'

type Props = {onClick: () => void}
export const DeleteButton: React.VFC<Props> = (props) => (
  <Button icon={<AlertCircle />} type="error" ghost onClick={props.onClick}>
    Delete All Tabs
  </Button>
)
