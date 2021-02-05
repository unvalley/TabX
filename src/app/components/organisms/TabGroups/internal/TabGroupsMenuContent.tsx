import React from 'react'
import {useTranslation} from 'react-i18next'
import {pinnTabList, deleteTabList, restoreTabList} from '~/shared/storage'
import {MENU_ICON_SIZE} from '~/app/constants/styles'
import {MenuItem} from '~/app/components/molecules/MenuItem'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import Trash from '@geist-ui/react-icons/Trash'
import ExternalLink from '@geist-ui/react-icons/externalLink'

export const TabGroupsMenuContent: React.VFC<{tabsId: number}> = (props) => {
  const [t, _] = useTranslation()

  const handlePin = async (id: number) => {
    await pinnTabList(id)
  }
  const handleDelete = async (id: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabList(id).then(() => {
      console.log('DONE')
      //   const newAllTabLists = removeTabLink(tabLists, tabListId, tabId)
      //   setTabLists(newAllTabLists)
    })
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
        handleClick={() => handleDelete(props.tabsId)}
        label={t('DELETE_TABS')}
        icon={<Trash size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
