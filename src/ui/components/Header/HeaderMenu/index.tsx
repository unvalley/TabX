import { Popover } from '@geist-ui/react'
import { ChevronUpDown, Coffee, Home, Settings, Twitter } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Rule } from '~/ui/constants/styles'
import { tabListsSortState } from '~/ui/stores/tabLists'
import { MenuItem } from '../../MenuItem'

const toDonation = () => {
  const url = 'https://www.buymeacoffee.com/kirohi'
  window.open(url)
}

const shareTwitter = () => {
  const text = 'TabX saves your tab life'
  const webstoreUrl = 'https://chrome.google.com/webstore'
  const url = `https://twitter.com/share?text=${text}&url=${webstoreUrl}`
  window.open(url)
}

export const HeaderMenuContent: React.VFC = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const [sort, setSort] = useRecoilState(tabListsSortState)
  const updateSort = () => {
    setSort(!sort)
  }

  const toHome = () => history.push('/')
  const toSettings = () => history.push('/settings')

  return (
    <>
      {/* FUNCTION */}
      <MenuItem onClick={updateSort} label={t('SORT')} icon={<ChevronUpDown size={Rule.MENU_ICON_SIZE} />} />
      <Popover.Item line />
      {/* ROUTING */}
      <MenuItem onClick={toHome} label={t('HOME')} icon={<Home size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={toSettings} label={t('SETTINGS')} icon={<Settings size={Rule.MENU_ICON_SIZE} />} />
      <Popover.Item line />
      {/* EXTERNAL LINKS */}
      <MenuItem onClick={shareTwitter} label={t('TWEET')} icon={<Twitter size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={toDonation} label={t('DONATE')} icon={<Coffee size={Rule.MENU_ICON_SIZE} />} />
    </>
  )
}
