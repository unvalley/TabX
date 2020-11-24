import {Card, Col, Grid, Row, Tabs, Text} from '@geist-ui/react'
import React from 'react'
import {TabLists} from '../../../shared/typings'
import {Header} from '../../components/Header'
import {LeftMenu} from '../../components/LeftMenu'
import {TabGroups} from './internal/TabGroups'

type Props = {
  isDark: boolean
  switchTheme: () => void
  tabLists: TabLists
}
export const List: React.FC<Props> = ({isDark, switchTheme, tabLists}) => {
  return (
    <>
      {/* TODO: containerとヘッダーはトップ層に移動 */}
      <Grid.Container
        justify="center"
        style={{width: '800px', margin: '1.5% auto'}}
      >
        <Header />
        <Row gap={0.8}>
          <Col span={4}>
            <LeftMenu isDark={isDark} switchTheme={switchTheme} />
          </Col>
          <Col span={20}>
            <Grid.Container gap={2} justify="center">
              <TabGroups tabLists={tabLists} />
            </Grid.Container>
          </Col>
        </Row>
      </Grid.Container>
    </>
  )
}
