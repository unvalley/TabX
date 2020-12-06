import {Card, Col, Grid, Row, Tabs, Text} from '@geist-ui/react'
import React from 'react'
import {TabLists} from '../../../shared/typings'
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
      <Grid.Container>
        <Row gap={0.4}>
          <LeftMenu isDark={isDark} switchTheme={switchTheme} />
          <Grid.Container justify="center">
            <TabGroups tabLists={tabLists} />
          </Grid.Container>
        </Row>
      </Grid.Container>
    </>
  )
}
