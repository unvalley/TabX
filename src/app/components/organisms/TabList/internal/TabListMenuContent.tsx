import {useToasts} from '@geist-ui/react'
import Clipboard from '@geist-ui/react-icons/Clipboard'
import ExternalLink from '@geist-ui/react-icons/externalLink'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import Trash from '@geist-ui/react-icons/Trash'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useRecoilState} from 'recoil'
import {MenuItem} from '~/app/components/molecules/MenuItem'
import {MENU_ICON_SIZE} from '~/app/constants/styles'
import {deleteTabList, pinnTabList, restoreTabList} from '~/shared/storage'
import {TabLists} from '../../../../../shared/typings'
import {removeTabList, tabListsState} from '../../../../store'

export const TabListMenuContent: React.VFC<{tabsId: number}> = (props) => {
  const [t, _] = useTranslation()
  const [tabLists, setTabLists] = useRecoilState<TabLists>(tabListsState)
  const [, setToast] = useToasts()

  const handlePin = async (id: number) => {
    await pinnTabList(id)
  }
  const handleDelete = async (id: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabList(id).then(() => {
      const newAllTabLists = removeTabList(tabLists, id)
      setTabLists(newAllTabLists)
    })
    // show Toast
    setToast({
      text: 'Selected tab list deleted',
    })
  }

  const genMarkdownLink = async (id: number) => {
    const targetTabList = tabLists.filter((tabList) => tabList.id === id)[0]
      .tabs
    const tabsText = (targetTabList as any[]).map((tab) => {
      return `[${tab.title}](${tab.url})`
    })

    navigator.clipboard.writeText(tabsText.join('\n'))
  }

  const handleOpen = async (id: number) => {
    await restoreTabList(id)
  }

  return (
    <>
      <MenuItem
        handleClick={() => handlePin(props.tabsId)}
        label={t('PIN_TABS')}
        icon={<Pin size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleOpen(props.tabsId)}
        label={t('OPEN_TABS')}
        icon={<ExternalLink size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => console.log('')}
        label={t('SHARE_LINKS')}
        icon={<Menu size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => genMarkdownLink(props.tabsId)}
        label={t('GEN_MARKDONW_LINKS')}
        icon={<Clipboard size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleDelete(props.tabsId)}
        label={t('DELETE_TABS')}
        icon={<Trash size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
