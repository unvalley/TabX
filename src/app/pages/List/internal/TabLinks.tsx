import {useTheme} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {deleteTabLink} from '../../../../shared/storage'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Colors, SHOW_TAB_TITLE_LENGTH, Spacing} from '../../../constants/styles'
import {omitText} from '../../../utils'
import {TabLinkOps} from './TabLinkOps'

const TabLinkWrapper = styled.span<{bgColor: string; hoverShadow: string}>`
  margin: ${Spacing['0.5']};
  padding: ${Spacing['0.5']} 6px ${Spacing['0.5']} ${Spacing['3']};
  cursor: pointer;
  border-radius: 33px;
  box-shadow: 0px 20px 35px -16px ${Colors.SHADOW};
  background-color: ${({bgColor}) => bgColor};
  justify-content: center;
  display: inline-flex;
  text-align: center;
  transition: all 0.4s ease;
  &:hover {
    box-shadow: ${({hoverShadow}) => hoverShadow};
    opacity: 0.9;
  }
`

const TabLinkButton = styled.a`
  justify-content: center;
  text-align: center;
  text-decoration: none;
  line-height: 1.5;
  display: inline-flex;
  z-index: 1;
`

// transform: translateY(-3px);
const Title = styled.span`
  word-break: break-all;
  font-size: 12px;
`

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
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => handleDelete(tab.id!)}
          >
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
