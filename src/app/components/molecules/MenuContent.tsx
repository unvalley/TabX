import {Popover} from '@geist-ui/react'
import {
  ChevronUpDown,
  Coffee,
  Link as LinkIcon,
  Twitter,
} from '@geist-ui/react-icons'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {MENU_ICON_SIZE} from '../../constants/styles'
import {openDonation, shareTwitter} from '../../utils/index'
import {MenuItem} from './MenuItem'

type Props = {sort: boolean; updateSort: () => void}

export const MenuContent: React.VFC<Props> = (props) => {
  const [t, _] = useTranslation()
  return (
    <>
      {/* User Operations */}
      <MenuItem
        handleClick={() => console.log('')}
        label={t('SHARE_LINKS')}
        icon={<LinkIcon size={MENU_ICON_SIZE} />}
      />

      {/* <MenuItem
        handleClick={() => console.log('')}
        label={props.t('ONLY_PINNED')}
        icon={<Pin size={MENU_ICON_SIZE} />}
      /> */}

      <MenuItem
        handleClick={props.updateSort}
        label={t('SORT')}
        icon={<ChevronUpDown size={MENU_ICON_SIZE} />}
      />

      <Popover.Item line />

      {/* Share and Donate */}
      <MenuItem
        handleClick={shareTwitter}
        label={t('TWEET')}
        icon={<Twitter size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={openDonation}
        label={t('DONATE')}
        icon={<Coffee size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
