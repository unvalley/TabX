import { useToasts } from '@geist-ui/react'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import Delete from '@geist-ui/react-icons/delete'
import ExternalLink from '@geist-ui/react-icons/ExternalLink'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater } from 'recoil'

import { TAB_LISTS } from '~/shared/constants'
import { deleteTabList, restoreTabList } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { MenuItem } from '~/ui/components/MenuItem'
import { Rule } from '~/ui/constants/styles'

type Props = { tabList: TabList; setTabList: SetterOrUpdater<TabList> }

export const TabListMenuContent: React.VFC<Props> = ({ tabList, setTabList }) => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const handleDelete = async (tabListId: number) => {
    // confirmation
    if (!window.confirm(t('DELETE_MESSAGE'))) {
      return
    }

    await deleteTabList(TAB_LISTS, tabListId).then(() => setTabList({} as TabList))
    setToast({
      text: t('DELETED_SELECTED_TABS'),
    })
  }

  const genMarkdownLink = async () => {
    const tabsText = tabList.tabs.map(tab => `[${tab.title}](${tab.url})`)
    setToast({
      text: t('COPY_MD_LINKS'),
      type: 'success',
    })
    return navigator.clipboard.writeText(tabsText.join('\n'))
  }

  const handleOpen = async (tabListId: number) => {
    // TODO: refactor
    await restoreTabList(TAB_LISTS, tabListId).then(() => setTabList({} as TabList))
  }

  return (
    <>
      <MenuItem
        onClick={() => handleOpen(tabList.id)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={Rule.MENU_ICON_SIZE} />}
      />
      <MenuItem
        onClick={genMarkdownLink}
        label={t('GEN_MARKDONW_LINKS')}
        icon={<Clipboard size={Rule.MENU_ICON_SIZE} />}
      />
      <MenuItem
        onClick={() => handleDelete(tabList.id)}
        label={t('DELETE_TABS')}
        icon={<Delete size={Rule.MENU_ICON_SIZE} />}
      />
    </>
  )
}