import { Popover, useTheme } from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import React from 'react'
import { SetterOrUpdater } from 'recoil'
import styled from 'styled-components'

import { TabList } from '~/shared/typings'
import { STORAGE_KEYS } from '~/ui/constants'
import { Spacing } from '~/ui/constants/styles'
import { useLocalStorage, useMouseOver, useTitle } from '~/ui/hooks'

import { _Row, HoveredMenu } from '../style'
import { TabListMenuContent } from './TabListMenuContent'

type Props = {
  index: number
  tabList: TabList
  setTabList: SetterOrUpdater<TabList>
  isLG?: boolean
}

// TODO: fix styles

export const TabListHeader: React.VFC<Props> = ({ index, tabList, setTabList, isLG }) => {
  const { handleMouseOver, handleMouseOut, isMouseOvered } = useMouseOver()
  const displayTitle = useTitle(tabList)
  const [isVisibleTabListMenu] = useLocalStorage(STORAGE_KEYS.IS_VISIBLE_TAB_LIST_MENU, true)
  const displayValue = isVisibleTabListMenu || isMouseOvered(index) ? 'inline-block' : 'none'

  // theme
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  return (
    <_Row
      style={{ minHeight: '50px' }}
      onMouseOver={() => handleMouseOver(index)}
      onMouseLeave={() => handleMouseOut()}
    >
      <HoveredMenu>
        <_Popover
          placement={isLG ? 'leftStart' : 'bottomStart'}
          leaveDelay={2}
          offset={12}
          content={<TabListMenuContent tabList={tabList} setTabList={setTabList} />}
          style={{
            display: displayValue,
            padding: Spacing['2'],
          }}
          $color={popoverColor}
          $bgColor={popoverBgColor}
        >
          <Menu
            style={{
              opacity: '0.7',
              verticalAlign: 'middle',
            }}
          />
        </_Popover>
      </HoveredMenu>
      <TabListTitle>{displayTitle}</TabListTitle>
    </_Row>
  )
}

const _Popover = styled(Popover)<{ $bgColor: string; $color: string }>`
  cursor: pointer;
  margin-right: 20px;
  border-radius: 50%;
  transition: all 0.3s ease;
  vertical-align: middle !important;
  line-height: 0;
  &:hover {
    color: ${props => props.$color};
    background-color: ${props => props.$bgColor};
  }
`

const TabListTitle = styled.span`
  display: block;
  font-weight: 600;
  font-size: 18px;
  align-self: center;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
