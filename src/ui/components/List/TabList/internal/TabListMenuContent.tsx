import { useToasts } from '@geist-ui/react'
import { Clipboard } from '@geist-ui/react-icons'
import { Delete } from '@geist-ui/react-icons'
import { ExternalLink } from '@geist-ui/react-icons'
import { Edit3 } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater } from 'recoil'

import { chromeActionService, tabService } from '~/core/services'
import { TabList } from '~/core/shared/typings'
import { MenuItem } from '~/ui/components/MenuItem'
import { Rule } from '~/ui/constants/styles'

type Props = { tabList: TabList; setTabList: SetterOrUpdater<TabList>; openEditDescriptionModal: () => void }

export const TabListMenuContent: React.VFC<Props> = ({ tabList, setTabList, openEditDescriptionModal }) => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const handleDelete = async (tabListId: number) => {
    if (!window.confirm(t('DELETE_MESSAGE'))) return

    await tabService.deleteTabList(tabListId).then(() => setTabList({} as TabList))
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
    await chromeActionService
      .restoreTabList(tabListId)
      .then(() => setTabList({} as TabList))
      .catch(err => console.error(err))
  }

  return (
    <>
      <MenuItem
        onClick={() => handleOpen(tabList.id)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={Rule.MENU_ICON_SIZE} />}
      />
      <MenuItem
        onClick={openEditDescriptionModal}
        label={t('EDIT_DESCRIPTION')}
        icon={<Edit3 size={Rule.MENU_ICON_SIZE} />}
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
