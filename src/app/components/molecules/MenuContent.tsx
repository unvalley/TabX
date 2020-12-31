import {Popover} from '@geist-ui/react'
import {
  Pin,
  Twitter,
  Coffee,
  Link as LinkIcon,
  ChevronUpDown,
} from '@geist-ui/react-icons'
import React from 'react'
import {MENU_ICON_SIZE} from '../../constants/styles'
import {MenuItem} from './MenuItem'
import {openDonation, shareTwitter} from '../../utils/index'
import {TFunction} from 'i18next'

type Props = {t: TFunction; sort: boolean; updateSort: () => void}

export const MenuContent: React.VFC<Props> = (props) => {
  return (
    <>
      {/* User Operations */}
      <MenuItem
        handleClick={() => console.log('')}
        label={props.t('SHARE_LINKS')}
        icon={<LinkIcon size={MENU_ICON_SIZE} />}
      />

      <MenuItem
        handleClick={() => console.log('')}
        label={props.t('ONLY_PINNED')}
        icon={<Pin size={MENU_ICON_SIZE} />}
      />

      <MenuItem
        handleClick={props.updateSort}
        label={props.t('SORT')}
        icon={<ChevronUpDown size={MENU_ICON_SIZE} />}
      />

      <Popover.Item line />

      {/* Share and Donate */}
      <MenuItem
        handleClick={shareTwitter}
        label={props.t('TWEET')}
        icon={<Twitter size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={openDonation}
        label={props.t('DONATE')}
        icon={<Coffee size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
