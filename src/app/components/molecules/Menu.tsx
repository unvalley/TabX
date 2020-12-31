import {Popover} from '@geist-ui/react'
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
import styled from 'styled-components'
import {Spacing} from '../../constants/styles'

const Item = styled.span`
  margin-left: ${Spacing['2']} !important;
  cursor: pointer;
`

type Props = {label?: string}
export const Menu: React.FC<Props> = ({label = 'Menu'}: Props) => {
  const [t, i18n] = useTranslation()

  const content = () => {
    const ICON_SIZE = 20

    const handleClickTweet = () => {
      const text = t('TWEET_MESSAGE')
      const webstoreUrl = 'https://chrome.google.com/webstore'
      const url = `https://twitter.com/share?text=${text}&url=${webstoreUrl}`
      window.open(url)
    }

    return (
      <>
        {/* User Operations */}
        <Popover.Item>
          <LinkIcon size={ICON_SIZE} />
          <Item>{t('SHARE_LINKS')}</Item>
        </Popover.Item>

        <Popover.Item>
          <Pin size={ICON_SIZE} />
          <Item>{t('ONLY_PINNED')}</Item>
        </Popover.Item>

        <Popover.Item>
          <ChevronUpDown size={ICON_SIZE} />
          <Item>{t('SORT')}</Item>
        </Popover.Item>

        <Popover.Item line />

        {/* Share and Donate */}
        <Popover.Item>
          <Twitter size={ICON_SIZE} />
          <Item onClick={handleClickTweet}>{t('TWEET')}</Item>
        </Popover.Item>

        <Popover.Item>
          <Coffee size={ICON_SIZE} />
          <Item>{t('DONATE')}</Item>
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
