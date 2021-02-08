import {useToasts} from '@geist-ui/react'
import {ExternalLink, Trash} from '@geist-ui/react-icons'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Tabs} from 'webextension-polyfill-ts'
import {MenuItem} from '~/app/components/molecules/MenuItem'
import {MENU_ICON_SIZE} from '~/app/constants/styles'
import {deleteTabList, pinnTabList, restoreTabList} from '~/shared/storage'
import {TabListElem, TabWithMeta} from '~/shared/typings'

type Props = {tabList: TabListElem}

export const TabListMenuContent: React.VFC<Props> = (props) => {
  const {tabList} = props
  const [t, _] = useTranslation()
  const [, setToast] = useToasts()

  const handlePin = async (tabListId: number) => {
    await pinnTabList(tabListId)
  }

  const handleDelete = async (tabListId: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabList(tabListId).then(() => {})
    // show Toast
    setToast({
      text: 'Selected tab list deleted',
    })
  }

  const genMarkdownLink = async () => {
    const tabsText = (tabList.tabs as Array<Tabs.Tab | TabWithMeta>).map(
      (tab) => `[${tab.title}](${tab.url})`,
    )
    return navigator.clipboard.writeText(tabsText.join('\n'))
  }

  const handleOpen = async (tabListId: number) => {
    await restoreTabList(tabListId)
  }

  return (
    <>
      <MenuItem
        handleClick={() => handlePin(tabList.id)}
        label={t('PIN_TABS')}
        icon={<Pin size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleOpen(tabList.id)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => console.log('')}
        label={t('SHARE_LINKS')}
        icon={<Menu size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={genMarkdownLink}
        label={t('GEN_MARKDONW_LINKS')}
        icon={<Clipboard size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleDelete(tabList.id)}
        label={t('DELETE_TABS')}
        icon={<Trash size={MENU_ICON_SIZE} />}
      />
    </>
  )
}