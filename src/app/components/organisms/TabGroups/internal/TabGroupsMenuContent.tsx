import {Menu, Pin, Trash} from '@geist-ui/react-icons'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {
  pinnTabList,
  deleteTabList,
  restoreTabList,
} from '../../../../../shared/storage'
import {MENU_ICON_SIZE} from '../../../../constants/styles'
import {MenuItem} from '../../../molecules/MenuItem'

export const TabGroupsMenuContent: React.VFC<{tabsId: number}> = (props) => {
  const [t, _] = useTranslation()

  const handlePin = async (id: number) => {
    await pinnTabList(id)
  }
  const handleDelete = async (id: number) => {
    await deleteTabList(id)
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
        icon={<Menu size={MENU_ICON_SIZE} />}
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
