import { Popover } from '@geist-ui/react'
import { ChevronUpDown, Heart, Home, Settings, Twitter, Zap } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { FEEDBACK_URL, TAB_LISTS, TWITTER_URL } from '~/shared/constants'
import { unifyTabs } from '~/shared/storage'
import { MenuItem } from '~/ui/components/MenuItem'
import { Rule } from '~/ui/constants/styles'
import { tabListsState, tabListsSortState } from '~/ui/stores/tabLists'

const toTwitter = () => window.open(TWITTER_URL)
const toFeedback = () => window.open(FEEDBACK_URL)

export const MenuContent: React.VFC = () => {
  const { t } = useTranslation()
  const setTabLists = useSetRecoilState(tabListsState)
  const [sort, setSort] = useRecoilState(tabListsSortState)
  const updateSort = () => {
    setSort(!sort)
  }
  const unify = () => {
    unifyTabs(TAB_LISTS)
      .then(res => setTabLists(res))
      .catch(err => console.error(err))
  }

  const history = useHistory()
  const toHome = () => history.push('/')
  const toSettings = () => history.push('/settings')

  return (
    <>
      {/* FUNCTION */}
      <MenuItem onClick={updateSort} label={t('SORT')} icon={<ChevronUpDown size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={unify} label={t('UNIFY')} icon={<Zap size={Rule.MENU_ICON_SIZE} />} />
      <Popover.Item line />
      {/* ROUTING */}
      <MenuItem onClick={toHome} label={t('HOME')} icon={<Home size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={toSettings} label={t('SETTINGS')} icon={<Settings size={Rule.MENU_ICON_SIZE} />} />
      <Popover.Item line />
      {/* EXTERNAL LINKS */}
      <MenuItem onClick={toTwitter} label={t('TWEET')} icon={<Twitter size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={toFeedback} label={t('FEEDBACK')} icon={<Heart size={Rule.MENU_ICON_SIZE} />} />
    </>
  )
}
