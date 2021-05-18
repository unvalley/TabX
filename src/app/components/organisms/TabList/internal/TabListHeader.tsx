import { Popover, useTheme } from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import React from 'react'
import { SetterOrUpdater } from 'recoil'
import styled from 'styled-components'
import { Spacing } from '~/app/constants/styles'
import { useLocalStorage, useMouseOver, useTitle } from '~/app/hooks'
import { TabList } from '~/shared/typings'
import { HoveredMenu, StyledRow } from '../style'
import { TabListMenuContent } from './TabListMenuContent'

type Props = {
  idx: number
  tabList: TabList
  setTabList: SetterOrUpdater<TabList>
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

export const TabListHeader: React.VFC<Props> = ({ idx, tabList, setTabList, isLG }) => {
  const { handleMouseOver, handleMouseOut, isMouseOvered } = useMouseOver()
  const displayTitle = useTitle(tabList)
  const [isVisibleTabListMenu] = useLocalStorage('isVisibleTabListMenu', true)
  const displayValue = isVisibleTabListMenu || isMouseOvered(idx) ? 'inline-block' : 'none'

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
            display: displayValue,
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
        {/* TODO: dont use h4  */}
        <h4 style={{ marginBottom: '0px' }}>{displayTitle}</h4>
      </div>
    </StyledRow>
  )
}
