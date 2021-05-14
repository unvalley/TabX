import { Popover, useTheme } from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Spacing } from '~/app/constants/styles'
import { useMouseOver, useTitle } from '~/app/hooks'
import { tabListState } from '~/app/stores/tabList'
import { TabList } from '~/shared/typings'
import { HoveredMenu, StyledRow } from '../style'
import { TabListMenuContent } from './TabListMenuContent'

type Props = {
  idx: number
  tabList: TabList
  isLG?: boolean
}

const StyledPopover = styled(Popover)<{ $bgColor: string; $color: string }>`
  cursor: pointer;
  margin-right: 20px;
  border-radius: 50%;
  transition: all 0.3s ease;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  &:hover {
    color: ${props => props.$color};
    background-color: ${props => props.$bgColor};
  }
`

export const TabListHeader: React.VFC<Props> = props => {
  const { idx, tabList, isLG } = props
  const setTabList = useSetRecoilState(tabListState(idx))
  const { handleMouseOver, handleMouseOut, isMouseOvered } = useMouseOver()
  const displayTitle = useTitle(tabList)

  // theme
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  return (
    <StyledRow onMouseOver={() => handleMouseOver(idx)} onMouseLeave={() => handleMouseOut()}>
      <HoveredMenu>
        <StyledPopover
          placement={isLG ? 'leftStart' : 'bottomStart'}
          leaveDelay={2}
          offset={12}
          content={<TabListMenuContent tabList={tabList} setTabList={setTabList} />}
          style={{
            display: isMouseOvered(idx) ? 'inline-block' : 'none',
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
        </StyledPopover>
      </HoveredMenu>
      <div>
        {tabList.hasPinned ? (
          <>
            <Pin />
            <span style={{ fontSize: '18px' }}>{displayTitle}</span>
          </>
        ) : (
          <h4 style={{ marginBottom: '0px' }}>{displayTitle}</h4>
        )}
      </div>
    </StyledRow>
  )
}
