import { Col, Row, Text } from '@geist-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { Menu } from '~/app/components/organisms/Menu'
import { tabListTotalCount } from '~/app/stores/tabList'
import { sortTabListsState } from '~/app/stores/tabLists'
import { TabList } from '~/shared/typings'
import { PageHeaderText } from './style'

type Props = { text?: string; shouldShowTabStats?: boolean }

export const Header: React.VFC<Props> = ({ text, shouldShowTabStats }) => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)
  const tabListIdexs = tabLists.map((_, idx) => idx)
  const tabCounts = tabListIdexs.map(idx => useRecoilValue<number>(tabListTotalCount(idx)))
  const totalTabCount = tabCounts.length >= 1 ? tabCounts.reduce((prev, cur) => prev + cur) : 0

  return (
    <Row>
      <Col span={16}>
        <Row align="middle" style={{ height: '100%', textAlign: 'center' }}>
          <PageHeaderText>{text}</PageHeaderText>
        </Row>
      </Col>
      <Col span={8}>
        {shouldShowTabStats && (
          <Row align="middle" style={{ height: '100%', textAlign: 'center' }}>
            <Text>Total tabs: {totalTabCount}</Text>
            <Menu />
          </Row>
        )}
      </Col>
    </Row>
  )
}
