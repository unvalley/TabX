import {Popover} from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import {HoveredMenu, StyledRow} from '../style'
import {TabListMenuContent} from './TabListMenuContent'

type Props = {
  idx: number
  totalTabs: number
  title: string
  tabListId: number
  hasPinned: boolean
  isLG?: boolean
}

export const TabListHeader: React.VFC<Props> = (props) => {
  const {idx, tabListId, title, hasPinned, isLG} = props
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }
  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  return (
    <StyledRow
      onMouseOver={() => handleMouseOver(idx)}
      onMouseLeave={() => setMouseOver({hover: false, idx: 0})}
    >
      <HoveredMenu>
        <Popover
          placement={isLG ? 'leftStart' : 'bottomEnd'}
          leaveDelay={2}
          offset={12}
          content={<TabListMenuContent tabsId={tabListId} />}
          style={{
            cursor: 'pointer',
            marginRight: '20px',
            display: isHoverd(idx) ? 'inline-block' : 'none',
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
        {hasPinned ? (
          <>
            <Pin />
            <span style={{fontSize: '18px'}}>{title}</span>
          </>
        ) : (
          <h4 style={{marginBottom: '0px'}}>{title}</h4>
        )}
      </div>
    </StyledRow>
  )
}
