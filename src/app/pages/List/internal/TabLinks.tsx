import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {Tooltip, useTheme} from '@geist-ui/react'
import {Pin, X} from '@geist-ui/react-icons'
import {deleteTabLink} from '../../../../shared/storage'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Spacing, TAB_LINKS_ELEM_SIZE} from '../../../constants/styles'
import {omitText} from '../../../utils'
import {TabLinkOps} from './TabLinkOps'

type Props = {tabs: Tabs.Tab[]; tabListId: number; createdAt: number}

const Block = styled.span<{bgColor: string; hoverShadow: string}>`
  margin: ${Spacing['0.5']};
  padding: ${Spacing['0.5']} ${Spacing['3']};
  cursor: pointer;
  border-radius: 33px;
  box-shadow: 0px 20px 35px -16px #2d81b121;
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

/**
 * TabGroupsの要素
 * - アイコンやタイトルを表示
 */
export const TabLinks: React.FC<Props> = (props) => {
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})

  const handleDelete = (tabId: number) => {
    alert('aa')
    deleteTabLink(props.tabListId, tabId)
  }
  const theme = useTheme()

  // useMemoかな
  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }

  const shouldShowOps = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  return (
    <>
      {props.tabs.map((tab, idx) => (
        <Block
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => setMouseOver({hover: false, idx: 0})}
          bgColor={theme.palette.accents_1}
        >
          <TabLinkButton key={idx} href={tab.url} target="_blank">
            <span style={{paddingRight: '5px'}}>
              <FaviconImage src={tab.favIconUrl!} size={20} />
            </span>
            <Title onClick={() => console.log('title')}>
              {omitText(tab.title!)(80)('...')}
            </Title>
          </TabLinkButton>
          {shouldShowOps(idx) && (
            <TabLinkOps onDelete={handleDelete} tab={tab} />
          )}
        </Block>
      ))}
    </>
  )
}
