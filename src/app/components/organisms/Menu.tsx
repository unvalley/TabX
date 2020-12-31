import {Popover} from '@geist-ui/react'
import {Menu as MenuIcon} from '@geist-ui/react-icons'
import React from 'react'
import {useRecoilState} from 'recoil'
import {tabListsSortState} from '../../store'
import {MenuContent} from '../molecules/MenuContent'
import {useTranslation} from 'react-i18next'

type Props = {label?: string}

export const Menu: React.VFC<Props> = ({label = 'Menu'}: Props) => {
  const [t, _] = useTranslation()
  const [sort, setSort] = useRecoilState(tabListsSortState)
  const updateSort = () => {
    setSort(!sort)
  }

  return (
    <Popover
      content={<MenuContent t={t} sort={sort} updateSort={updateSort} />}
      style={{
        cursor: 'pointer',
      }}
    >
      <MenuIcon />
    </Popover>
  )
}
