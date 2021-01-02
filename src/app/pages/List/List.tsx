import {Col, Row, Text} from '@geist-ui/react'
import * as React from 'react'
import {TabLists} from '../../../shared/typings'
import {SearchBox} from '../../components/molecules/SearchBox'
import {Menu} from '../../components/organisms/Menu'
import {TabGroups} from './internal/TabGroups'

type Props = {
  tabLists: TabLists
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const MemoizedTabGroups = React.memo<{tabLists: TabLists}>((props) => (
  <TabGroups tabLists={props.tabLists} />
))

const Header: React.VFC<Omit<Props, 'tabLists'>> = (props) => (
  <Row>
    {/* Left */}
    <Col span={16}>
      {/* TODO: need left space 8px */}
      <SearchBox query={props.query} onChange={props.setQuery} />
    </Col>
    {/* Right */}
    <Col span={8}>
      <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
        <Text>Total tabs: 200</Text>
        <Menu />
      </Row>
    </Col>
  </Row>
)

export const List: React.FC<Props> = (props) => {
  return (
    <>
      <Header query={props.query} setQuery={props.setQuery} />
      <MemoizedTabGroups tabLists={props.tabLists} />
    </>
  )
}
