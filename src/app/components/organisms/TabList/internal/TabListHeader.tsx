import {Popover} from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import {useResetRecoilState, useRecoilState} from 'recoil'
import {useMouseOver} from '~/app/hooks/useMouseOver'
import {useTitle} from '~/app/hooks/useTitle'
import {TabListElem} from '~/shared/typings'
import {tabListState} from '../../../../store'
import {HoveredMenu, StyledRow} from '../style'
import {TabListMenuContent} from './TabListMenuContent'

type Props = {
  idx: number
  tabList: TabListElem
  isLG?: boolean
}

export const TabListHeader: React.VFC<Props> = (props) => {
  const {idx, tabList, isLG} = props
  const resetTabList = useResetRecoilState(tabListState(idx))
  const [t, setTabList] = useRecoilState(tabListState(idx))
  const {handleMouseOver, handleMouseOut, isMouseOvered} = useMouseOver()
  const displayTitle = useTitle(tabList)

  return (
    <StyledRow
      onMouseOver={() => handleMouseOver(idx)}
      onMouseLeave={() => handleMouseOut()}
    >
      <HoveredMenu>
        <Popover
          placement={isLG ? 'leftStart' : 'bottomEnd'}
          leaveDelay={2}
          offset={12}
          content={
            <TabListMenuContent
              tabList={tabList}
              setTabList={setTabList}
              resetTabList={resetTabList}
            />
          }
          style={{
            cursor: 'pointer',
            marginRight: '20px',
            display: isMouseOvered(idx) ? 'inline-block' : 'none',
          }}
        >
          <Menu
            style={{
              opacity: '0.7',
              verticalAlign: 'middle',
            }}
          />
        </Popover>
      </HoveredMenu>
      <div>
        {tabList.hasPinned ? (
          <>
            <Pin />
            <span style={{fontSize: '18px'}}>{displayTitle}</span>
          </>
        ) : (
          <h4 style={{marginBottom: '0px'}}>{displayTitle}</h4>
        )}
      </div>
    </StyledRow>
  )
}
