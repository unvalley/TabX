import {Button, Tag} from '@geist-ui/react'
import {AlertCircle} from '@geist-ui/react-icons'
import React from 'react'

type Props = {
  deleteAllTabs: () => void
}

export const Settings: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <Tag>Status: v0.0.1</Tag>
      </div>
      <Button
        icon={<AlertCircle />}
        type="error"
        ghost
        onClick={props.deleteAllTabs}
      >
        Delete All Tabs
      </Button>
    </>
  )
}
