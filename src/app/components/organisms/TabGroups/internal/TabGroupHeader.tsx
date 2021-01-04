import {Popover} from '@geist-ui/react'
import {Menu} from '@geist-ui/react-icons'
import React from 'react'
import {HoveredMenu, StyledRow} from '../style'
import {TabGroupsMenuContent} from './TabGroupsMenuContent'

type Props = {
  totalTabs: number
  title: string
  tabsId: number
  hasPinned: boolean
  isLG?: boolean
}

export const TabGroupHeader: React.VFC<Props> = (props) => {
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }
  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  return (
    <>
      <StyledRow
        onMouseOver={() => handleMouseOver(props.tabsId)}
        onMouseLeave={() => setMouseOver({hover: false, idx: 0})}
      >
        <HoveredMenu>
          <Popover
            placement={props.isLG ? 'leftStart' : 'bottomEnd'}
            leaveDelay={2}
            offset={12}
            content={<TabGroupsMenuContent tabsId={props.tabsId} />}
            style={{
              cursor: 'pointer',
              marginRight: '20px',
              display: isHoverd(props.tabsId) ? 'inline-block' : 'none',
            }}
          >
            <Menu
              style={{
                opacity: '0.7',
                verticalAlign: 'middle',
                padding: '0 5px',
              }}
            />
          </Popover>
        </HoveredMenu>
        <div>
          <h4 style={{marginBottom: '0px'}}>{props.totalTabs} Tabs</h4>
        </div>
      </StyledRow>
    </>
  )
}
