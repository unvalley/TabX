import {Popover} from '@geist-ui/react'
import {Menu as MenuIcon} from '@geist-ui/react-icons'
import React from 'react'
import {useRecoilState} from 'recoil'
import {tabListsSortState} from '../../store'
import {MenuContent} from '../molecules/MenuContent'

type Props = {label?: string}

export const Menu: React.VFC<Props> = ({label = 'Menu'}: Props) => {
  const [sort, setSort] = useRecoilState(tabListsSortState)
  const updateSort = () => {
    setSort(!sort)
  }

  return (
    <Popover
      content={<MenuContent sort={sort} updateSort={updateSort} />}
      style={{
        cursor: 'pointer',
      }}
    >
      <MenuIcon />
    </Popover>
  )
}
