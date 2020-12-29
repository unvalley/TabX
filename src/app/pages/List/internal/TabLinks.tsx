import {Card, Link} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {X} from '@geist-ui/react-icons'
import {deleteTabLink} from '../../../../shared/storage'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Spacing} from '../../../constants/styles'

type Props = {tabs: Tabs.Tab[]; tabListId: number; createdAt: number}

const Tab = styled.a`
    display: inline-flex;
    text-decoration: none;
    line-height: 1.5;
    poistion: relative;
    padding ${Spacing['0.5']} ${Spacing['3']};
    margin ${Spacing['0.5']} ${Spacing['2']};
    background-color: white;
    cursor: pointer;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    border-radius: 33px;
    box-shadow: 0px 20px 35px -16px #2d81b121;
    transition: all 800ms ease;
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

  return (
    <>
      {props.tabs.map((tab, idx) => (
        <Tab key={idx} href={tab.url} target="_blank">
          <div>
            <FaviconImage src={tab.favIconUrl!} />
          </div>
          <div>
            <Title onClick={() => onDelete(tab.id!)}>{tab.title}</Title>
            {/* <span>{props.createdAt}</span> */}
          </div>
          <div>
            <span style={{cursor: 'pointer'}} onClick={() => onDelete(tab.id!)}>
              <X />
            </span>
          </div>
        </Tab>
      ))}
    </>
  )
}
