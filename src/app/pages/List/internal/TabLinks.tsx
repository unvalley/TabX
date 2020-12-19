import {Col, Link, Row} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'webextension-polyfill-ts'
import {FaviconImage} from '../../../components/FaviconImage'
import {Spacing} from '../../../constants/styles'

type Props = {tabs: Tabs.Tab[]}

const Tab = styled(Row)`
    display: flex;
    padding ${Spacing['0.5']} ${Spacing['3']}
`

export const TabLinks: React.FC<Props> = ({tabs}) => {
  const deleteTab = (id?: number) => {
    console.log(id, 'を削除')
  }
  return (
    <>
      {tabs.map((tab) => (
        <Tab key={tab.id} gap={2}>
          <FaviconImage src={tab.favIconUrl!} />
          <Col>
            <Link
              color
              target="_blank"
              href={tab.url}
              onClick={() => deleteTab(tab.id!)}
              style={{
                wordBreak: 'break-all',
                fontSize: '14px',
              }}
            >
              {tab.title}
            </Link>
          </Col>
        </Tab>
      ))}
    </>
  )
}
