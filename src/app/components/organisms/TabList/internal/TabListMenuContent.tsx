import { useToasts } from '@geist-ui/react'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import Delete from '@geist-ui/react-icons/delete'
import ExternalLink from '@geist-ui/react-icons/ExternalLink'
// import Menu from '@geist-ui/react-icons/Menu'
// import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater } from 'recoil'
import { MenuItem } from '~/app/components/molecules/MenuItem'
import { Rule } from '~/app/constants/styles'
import { TAB_LISTS } from '~/shared/constants'
import { deleteTabList, restoreTabList } from '~/shared/storage'
import { TabList } from '~/shared/typings'

type Props = { tabList: TabList; setTabList: SetterOrUpdater<TabList> }

export const TabListMenuContent: React.VFC<Props> = props => {
  const { tabList, setTabList } = props
  const { t } = useTranslation()
  const [, setToast] = useToasts()

  // const handlePin = async (tabListId: number) => {
  //   await pinnTabList(TAB_LISTS, tabListId)
  // }

  const handleDelete = async (tabListId: number) => {
    // confirmation
    // Are you sure you want to delete?
    if (!window.confirm(t('DELETE_MESSAGE'))) {
      return
    }

    await deleteTabList(TAB_LISTS, tabListId).then(() => setTabList({} as TabList))

    // show Toast
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
    await restoreTabList(TAB_LISTS, tabListId).then(() => setTabList({} as TabList))
  }

  return (
    <>
      {/* <MenuItem
        handleClick={() => handlePin(tabList.id)}
        label={t('PIN_TABS')}
        icon={<Pin size={Rule.MENU_ICON_SIZE} />}
      /> */}
      <MenuItem
        handleClick={() => handleOpen(tabList.id)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={Rule.MENU_ICON_SIZE} />}
      />
      {/* <MenuItem
        handleClick={() => console.log('')}
        label={t('SHARE_LINKS')}
        icon={<Menu size={Rule.MENU_ICON_SIZE} />}
      /> */}
      <MenuItem
        handleClick={genMarkdownLink}
        label={t('GEN_MARKDONW_LINKS')}
        icon={<Clipboard size={Rule.MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleDelete(tabList.id)}
        label={t('DELETE_TABS')}
        icon={<Delete size={Rule.MENU_ICON_SIZE} />}
      />
    </>
  )
}
