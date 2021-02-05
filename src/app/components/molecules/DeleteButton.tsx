import {Button} from '@geist-ui/react'
import {AlertCircle} from '@geist-ui/react-icons'
import React from 'react'

type Props = {onClick: () => void; label?: string}

export const DeleteButton: React.VFC<Props> = ({
  onClick,
  label = 'Delete All Tabs',
}: Props) => (
  <Button
    size="medium"
    icon={<AlertCircle />}
    type="error"
    ghost
    onClick={onClick}
  >
    {label}
  </Button>
)
