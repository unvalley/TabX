import { Popover, useToasts } from '@geist-ui/react'
import { ChevronUpDown, Heart, Home, Settings, Twitter, Zap } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { tabService } from '~/core/services'
import { FEEDBACK_URL, TWITTER_URL } from '~/core/shared/constants'
import { MenuItem } from '~/ui/components/MenuItem'
import { Rule } from '~/ui/constants/styles'
import { tabListsSortState, tabListsState } from '~/ui/stores/tabLists'

const toTwitter = () => window.open(TWITTER_URL)
const toFeedback = () => window.open(FEEDBACK_URL)

export const MenuContent: React.VFC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const [sort, setSort] = useRecoilState(tabListsSortState)
  const [_, setTabLists] = useRecoilState(tabListsState)

  const updateSort = () => {
    setSort(!sort)
  }
  const uniqueTabs = async () => {
    await tabService
      .uniqueAllTabList()
      .then(async res => {
        if (!res) return setToast({ type: 'default', text: 'Tabs are already unique' })

        setToast({ type: 'success', text: 'Successfuly made the tabs unique (by url)' })
        const tabLists = await tabService.getAllTabList()
        setTabLists(tabLists)
      })
      .catch(() => setToast({ type: 'error', text: 'An unexpected error has occurred' }))
  }

  const history = useHistory()
  const toHome = () => history.push('/')
  const toSettings = () => history.push('/settings')

  return (
    <>
      {/* FUNCTION */}
      <MenuItem onClick={updateSort} label={t('SORT')} icon={<ChevronUpDown size={Rule.MENU_ICON_SIZE} />} />
      <MenuItem onClick={uniqueTabs} label={t('UNIQUE')} icon={<Zap size={Rule.MENU_ICON_SIZE} />} />
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
