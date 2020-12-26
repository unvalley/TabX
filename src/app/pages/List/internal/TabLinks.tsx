import {Col, Link, Row} from '@geist-ui/react'
import produce from 'immer'
import React from 'react'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {deleteTabLink} from '../../../../shared/storage'
import {TabLists} from '../../../../shared/typings'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Spacing} from '../../../constants/styles'
import {tabListsState} from '../../../store'

type Props = {tabs: Tabs.Tab[]; tabListId: number}

const Tab = styled(Row)`
    display: flex;
    padding ${Spacing['0.5']} ${Spacing['3']}
`
const TitleLink = styled(Link)`
    word-break: break-all
    font-size: 13px
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
        <Tab key={idx} gap={2}>
          <Col>
            <FaviconImage src={tab.favIconUrl!} />
          </Col>
          <Col span={18}>
            <TitleLink
              color
              target="_blank"
              href={tab.url}
              onClick={() => onDelete(tab.id!)}
            >
              {tab.title}
            </TitleLink>
          </Col>
          <Col span={4}>
            <span onClick={() => onDelete(tab.id!)}>x</span>
          </Col>
        </Tab>
      ))}
    </>
  )
}
