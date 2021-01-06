import {Menu, Pin, Trash} from '@geist-ui/react-icons'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {pinnTabListElem} from '../../../../../shared/storage'
import {MENU_ICON_SIZE} from '../../../../constants/styles'
import {MenuItem} from '../../../molecules/MenuItem'
import {deleteTabListElem} from '../../../../../shared/storage'

export const TabGroupsMenuContent: React.VFC<{tabsId: number}> = (props) => {
  const [t, _] = useTranslation()

  const handlePin = async (id: number) => {
    await pinnTabListElem(id)
  }
  const handleDelete = async (id: number) => {
    console.log('実行はされている')
    await deleteTabListElem(id)
  }

  return (
    <>
      <MenuItem
        handleClick={() => handlePin(props.tabsId)}
        label={t('PIN')}
        icon={<Pin size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => console.log('')}
        label={t('OPEN_TABS')}
        icon={<Trash size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => console.log('')}
        label={t('SHARE_LINKS')}
        icon={<Menu size={MENU_ICON_SIZE} />}
      />
      <MenuItem
        handleClick={() => handleDelete(props.tabsId)}
        label={t('DELETE')}
        icon={<Trash size={MENU_ICON_SIZE} />}
      />
    </>
  )
}
