import {useTheme} from '@geist-ui/react'
import React from 'react'
import {Tabs} from 'webextension-polyfill-ts'
import {deleteTabLink} from '../../../../shared/storage'
import {SHOW_TAB_TITLE_LENGTH} from '../../../constants/styles'
import {omitText} from '../../../utils'
import {FaviconImage} from '../../atoms/FaviconImage'
import {TabLinkOps} from '../TabLinkOps'
import {TabLinkButton, TabLinkWrapper, Title} from './style'

type Props = {tabs: Tabs.Tab[]; tabListId: number; createdAt: number}
/**
 * TabGroupsの要素
 * - アイコンやタイトルを表示
 */
export const TabLinks: React.FC<Props> = (props) => {
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})
  const theme = useTheme()

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }

  const handleDelete = async (tabId: number) => {
    await deleteTabLink(props.tabListId, tabId)
  }

  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  return (
    <>
      {props.tabs.map((tab, idx) => (
        <TabLinkWrapper
          key={tab.id!}
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => setMouseOver({hover: false, idx: 0})}
          bgColor={theme.palette.accents_1}
        >
          <TabLinkButton href={tab.url} target="_blank">
            <span style={{paddingRight: '5px'}}>
              <FaviconImage src={tab.favIconUrl!} size={20} />
            </span>
            <Title>{omitText(tab.title!)(SHOW_TAB_TITLE_LENGTH)('...')}</Title>
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
