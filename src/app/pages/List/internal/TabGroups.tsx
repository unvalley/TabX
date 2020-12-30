import {Button, Col, Input, Link, Popover, Row, Text} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {TabLists} from '../../../../shared/typings'
import {TabLinks} from './TabLinks'
import {Link as LinkIcon, Search} from '@geist-ui/react-icons'

type Props = {tabLists: TabLists}

const TabListElem = styled.section`
  width: 100%;
  min-width: 80%;
`

/**
 * 全てのタブグループを描画する
 * @param props
 */
export const TabGroups: React.FC<Props> = (props) => {
  const content = () => (
    <>
      <Popover.Item>
        <LinkIcon />
        <span>Share</span>
      </Popover.Item>
      <Popover.Item>
        <Search />
        <span>Only Pinned</span>
      </Popover.Item>
      <Popover.Item>
        <Link color href="#">
          A hyperlink for edit profile
        </Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Search />
        <span>Donate</span>
      </Popover.Item>
    </>
  )

  return (
    <>
      <Row gap={0.8} style={{}}>
        <Col span={16}>
          <Input size="medium" icon={<Search />} placeholder="Search…" />
        </Col>
        <Col span={8}>
          <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
            <Col>
              <Text>Total tabs: 200</Text>
            </Col>
            <Col>
              <Popover content={content}>Menu</Popover>
            </Col>
          </Row>
        </Col>
      </Row>

      {props.tabLists.map((tabList, idx) => (
        <TabListElem key={idx}>
          <TabLinks
            tabs={tabList.tabs}
            tabListId={tabList.id!}
            createdAt={tabList.createdAt!}
          />
        </TabListElem>
      ))}
    </>
  )
}
