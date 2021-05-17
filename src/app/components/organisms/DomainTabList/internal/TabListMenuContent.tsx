import { useToasts } from '@geist-ui/react'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import Delete from '@geist-ui/react-icons/delete'
import ExternalLink from '@geist-ui/react-icons/ExternalLink'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater } from 'recoil'
import { MenuItem } from '~/app/components/molecules/MenuItem'
import { Rule } from '~/app/constants/styles'
import { TAB_LISTS } from '~/shared/constants'
import { deleteTabList, restoreTabList } from '~/shared/storage'
import { DomainTabList } from '~/shared/typings'

type Props = { tabList: DomainTabList; setTabList: SetterOrUpdater<DomainTabList> }

export const TabListMenuContent: React.VFC<Props> = props => {
  const { tabList, setTabList } = props
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const handleDelete = async (tabListId: number) => {
    if (!window.confirm(t('DELETE_MESSAGE'))) {
      return
    }

    await deleteTabList(TAB_LISTS, tabListId)
      .then(() => setTabList({} as DomainTabList))
      .then(() =>
        setToast({
          text: t('DELETED_SELECTED_TABS'),
        }),
      )
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
    await restoreTabList(TAB_LISTS, tabListId).then(() => setTabList({} as DomainTabList))
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
