import { useToasts } from '@geist-ui/react'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import Delete from '@geist-ui/react-icons/delete'
import ExternalLink from '@geist-ui/react-icons/ExternalLink'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Resetter } from 'recoil'
import { Tabs } from 'webextension-polyfill-ts'
import { MenuItem } from '~/app/components/molecules/MenuItem'
import { MENU_ICON_SIZE } from '~/app/constants/styles'
import { deleteTabList, pinnTabList, restoreTabList } from '~/shared/storage'
import { TabListElem, TabWithMeta } from '~/shared/typings'

type Props = { tabList: TabListElem; resetTabList: Resetter; setTabList: any }

export const TabListMenuContent: React.VFC<Props> = props => {
  const { tabList, setTabList } = props
  const [t, _] = useTranslation()
  const [, setToast] = useToasts()

  const handlePin = async (tabListId: number) => {
    await pinnTabList(tabListId)
  }

  const handleDelete = async (tabListId: number) => {
    await deleteTabList(tabListId).then(() => setTabList({}))
    // show Toast
    setToast({
      text: t('DELETED_SELECTED_TABS'),
    })
  }

  const genMarkdownLink = async () => {
    const tabsText = (tabList.tabs as Array<Tabs.Tab | TabWithMeta>).map(tab => `[${tab.title}](${tab.url})`)
    setToast({
      text: t('COPY_MD_LINKS'),
      type: 'success',
    })
    return navigator.clipboard.writeText(tabsText.join('\n'))
  }

  const handleOpen = async (tabListId: number) => {
    await restoreTabList(tabListId)
  }

  return (
    <>
      <MenuItem handleClick={() => handlePin(tabList.id)} label={t('PIN_TABS')} icon={<Pin size={MENU_ICON_SIZE} />} />
      <MenuItem
        handleClick={() => handleOpen(tabList.id)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={MENU_ICON_SIZE} />}
      />
      <MenuItem handleClick={() => console.log('')} label={t('SHARE_LINKS')} icon={<Menu size={MENU_ICON_SIZE} />} />
      <MenuItem
        handleClick={genMarkdownLink}
        label={t('GEN_MARKDONW_LINKS')}
        icon={<Clipboard size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleDelete(tabList.id)}
        label={t('DELETE_TABS')}
        icon={<Delete size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
