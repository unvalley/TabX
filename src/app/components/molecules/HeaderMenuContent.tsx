import { Popover } from '@geist-ui/react'
import { ChevronUpDown, Coffee, Twitter } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Rule } from '~/app/constants/styles'
import { tabListsSortState } from '~/app/stores/tabLists'
import { openDonation, shareTwitter } from '../../utils/index'
import { MenuItem } from './MenuItem'

export const MenuContent: React.VFC = () => {
  const { t } = useTranslation()
  const [sort, setSort] = useRecoilState(tabListsSortState)
  const updateSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <MenuItem handleClick={updateSort} label={t('SORT')} icon={<ChevronUpDown size={Rule.MENU_ICON_SIZE} />} />
      <Popover.Item line />
      {/* Share and Donate */}
      <MenuItem handleClick={shareTwitter} label={t('TWEET')} icon={<Twitter size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem handleClick={openDonation} label={t('DONATE')} icon={<Coffee size={Rule.MENU_ICON_SIZE} />} />
    </>
  )
}
