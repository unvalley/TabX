import { Popover } from '@geist-ui/react'
import { MoreVertical } from '@geist-ui/react-icons'
import React from 'react'
import { MenuContent } from '../../molecules/HeaderMenuContent'

export const Menu: React.VFC = () => {
  return (
    <Popover
      content={<MenuContent />}
      style={{
        cursor: 'pointer',
      }}
    >
      <MoreVertical />
    </Popover>
  )
}
