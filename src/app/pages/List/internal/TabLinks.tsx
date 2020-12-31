import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {useTheme} from '@geist-ui/react'
import {X} from '@geist-ui/react-icons'
import {deleteTabLink} from '../../../../shared/storage'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Spacing} from '../../../constants/styles'
import {omitText} from '../../../utils'

type Props = {tabs: Tabs.Tab[]; tabListId: number; createdAt: number}

const TabLinkButton = styled.a<{bgColor: string; hoverShadow: string}>`
  display: inline-flex;
  text-decoration: none;
  line-height: 1.5;
  background-color: ${({bgColor}) => bgColor};
  margin: ${Spacing['0.5']};
  padding: ${Spacing['0.5']} ${Spacing['3']};
  cursor: pointer;
  justify-content: center;
  text-align: center;
  border-radius: 33px;
  box-shadow: 0px 20px 35px -16px #2d81b121;
  transition: all 0.4s ease;
  &:hover {
    box-shadow: ${({hoverShadow}) => hoverShadow};
    opacity: 0.9;
    transform: translateY(-3px);
  }
`

const Title = styled.span`
  word-break: break-all;
  font-size: 12px;
`

/**
 * TabGroupsの要素
 * - アイコンやタイトルを表示
 */
export const TabLinks: React.FC<Props> = (props) => {
  const onDelete = (tabId: number) => {
    deleteTabLink(props.tabListId, tabId)
  }
  const theme = useTheme()

  return (
    <>
      {props.tabs.map((tab, idx) => (
        <TabLinkButton
          key={idx}
          href={tab.url}
          target="_blank"
          bgColor={theme.palette.accents_1}
          hoverShadow={theme.expressiveness.shadowSmall}
        >
          <span style={{paddingRight: '5px'}}>
            <FaviconImage src={tab.favIconUrl!} size={20} />
          </span>
          <div>
            <Title onClick={() => onDelete(tab.id!)}>
              {omitText(tab.title!)(80)('...')}
            </Title>
          </div>
          <div>
            <span style={{cursor: 'pointer'}} onClick={() => onDelete(tab.id!)}>
              <X />
            </span>
          </div>
        </TabLinkButton>
      ))}
    </>
  )
}
