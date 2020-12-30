import {Link, Popover} from '@geist-ui/react'
import {
  Search,
  Coffee,
  Link as LinkIcon,
  Twitter,
  Pin,
  ChevronUpDown,
} from '@geist-ui/react-icons'
import React from 'react'

const content = () => (
  <>
    {/* User Operations */}
    <Popover.Item>
      <LinkIcon />
      <span>Share Links</span>
    </Popover.Item>

    <Popover.Item>
      <Pin />
      <span>Only Pinned</span>
    </Popover.Item>

    <Popover.Item>
      <ChevronUpDown />
      <span>Sort By CreatedAt</span>
    </Popover.Item>

    {/* Share and Donate */}
    <Popover.Item line />
    <Popover.Item>
      <Twitter />
      <span>Tweet</span>
    </Popover.Item>
    <Popover.Item>
      <Coffee />
      <span>Donate</span>
    </Popover.Item>
  </>
)

type Props = {label?: string}
export const Menu: React.FC<Props> = ({label = 'Menu'}: Props) => (
  <Popover content={content}>{label}</Popover>
)
