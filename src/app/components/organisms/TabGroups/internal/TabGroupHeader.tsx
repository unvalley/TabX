import {Popover} from '@geist-ui/react'
import Menu from '@geist-ui/react-icons/Menu'
import Pin from '@geist-ui/react-icons/Pin'
import React from 'react'
import {useRecoilState} from 'recoil'
import {Rule} from '~/app/constants/rule'
import {deleteTabLink} from '~/shared/storage'
import {omitText} from '~/shared/utils/util'
import {TabListElem} from '../../../../../shared/typings'
import {removeTabList, tabListState} from '../../../../store'
import {TabLinkOps} from '../../../molecules/TabLinkOps'
import {
  TabLinkButton,
  TabLinkWrapper,
  Title,
} from '../../../molecules/TabLinks/style'
import {HoveredMenu, StyledRow} from '../style'
import {TabGroupsMenuContent} from './TabGroupsMenuContent'

type Props = {
  idx: number
  totalTabs: number
  title: string
  tabsId: number
  hasPinned: boolean
  isLG?: boolean
}

export const TabGroupHeader: React.VFC<Props> = (props) => {
  const {idx, totalTabs, title, tabsId, hasPinned, isLG} = props
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})

  const [tabList, setTabList] = useRecoilState<TabListElem>(tabListState(idx))

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

  const handleDelete = async (tabId: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabLink(tabsId, tabId).then(() => {
      console.log('before', tabList)
      const newTabs = removeTabList(tabList, tabId)
      setTabList(newTabs as any)
    })
  }
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
      {(tabList.tabs as any[]).map((tab, idx) => (
        <TabLinkWrapper
          id={String(tab.id)}
          key={tab.id!}
          hoverShadow={'red'}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => setMouseOver({hover: false, idx: -1})}
          bgColor={'red'}
        >
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => handleDelete(tab.id!)}
            color={'blue'}
          >
            <Title>{omitText(tab.title!)(Rule.TITLE_MAX_LENGTH)('…')}</Title>
          </TabLinkButton>
          {/* Ops show when the tab is hoverd */}
          <TabLinkOps
            tabId={tab.id!}
            handleDelete={handleDelete}
            shouldShow={isHoverd(idx)}
          />
        </TabLinkWrapper>
      ))}
    </>
  )
}
