import {Button, Tag} from '@geist-ui/react'
import {AlertCircle} from '@geist-ui/react-icons'
import React from 'react'
import {deleteAllTabLists} from '../../../shared/storage'

export const Settings: React.FC = () => {
  const deleteAllTabs = () => deleteAllTabLists()

  return (
    <>
      <div>
        <Tag>Status: v0.0.1</Tag>
      </div>
      <Button icon={<AlertCircle />} type="error" ghost onClick={deleteAllTabs}>
        Delete All Tabs
      </Button>
    </>
  )
}
