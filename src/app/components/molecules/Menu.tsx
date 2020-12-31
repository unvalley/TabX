import {Link, Popover} from '@geist-ui/react'
import {
  Coffee,
  Link as LinkIcon,
  Twitter,
  Pin,
  ChevronUpDown,
  Menu as MenuIcon,
} from '@geist-ui/react-icons'

import React from 'react'
import {useTranslation} from 'react-i18next'

type Props = {label?: string}
export const Menu: React.FC<Props> = ({label = 'Menu'}: Props) => {
  const [t, i18n] = useTranslation()

  const content = () => {
    return (
      <>
        {/* User Operations */}
        <Popover.Item>
          <LinkIcon />
          <span>{t('SHARE_LINKS')}</span>
        </Popover.Item>

        <Popover.Item>
          <Pin />
          <span>{t('ONLY_PINNED')}</span>
        </Popover.Item>

        <Popover.Item>
          <ChevronUpDown />
          <span>{t('SORT')}</span>
        </Popover.Item>

        {/* Share and Donate */}
        <Popover.Item line />
        <Popover.Item>
          <Twitter />
          <span>{t('TWEET')}</span>
        </Popover.Item>
        <Popover.Item>
          <Coffee />
          <span>{t('DONATE')}</span>
        </Popover.Item>
      </>
    )
  }

  return (
    <Popover
      content={content}
      style={{
        cursor: 'pointer',
      }}
    >
      <MenuIcon />
    </Popover>
  )
}
