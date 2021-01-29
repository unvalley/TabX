import {Rule} from '@app/utils/rule'
import {Popover} from '@geist-ui/react'
import {Menu, Pin} from '@geist-ui/react-icons'
import React from 'react'
import {omitText} from '../../../../../shared/utils/util'
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
  const {totalTabs, title, tabsId, hasPinned, isLG} = props
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }
  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  const firstTabLinkTitle = omitText(title)(Rule.TITLE_MAX_LENGTH)('…')
  const displayTitle =
    totalTabs > 1
      ? `「${firstTabLinkTitle}」と${totalTabs - 1}件`
      : firstTabLinkTitle

  return (
    <>
      <StyledRow
        onMouseOver={() => handleMouseOver(tabsId)}
        onMouseLeave={() => setMouseOver({hover: false, idx: 0})}
      >
        <HoveredMenu>
          <Popover
            placement={isLG ? 'leftStart' : 'bottomEnd'}
            leaveDelay={2}
            offset={12}
            content={<TabGroupsMenuContent tabsId={tabsId} />}
            style={{
              cursor: 'pointer',
              marginRight: '20px',
              display: isHoverd(tabsId) ? 'inline-block' : 'none',
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
              <span style={{fontSize: '18px'}}>{displayTitle}</span>
            </>
          ) : (
            <h4 style={{marginBottom: '0px'}}>{displayTitle}</h4>
          )}
        </div>
      </StyledRow>
    </>
  )
}
