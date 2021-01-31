import {Col, Row, Text} from '@geist-ui/react'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useRecoilValue} from 'recoil'
import {TabLists} from '../../../shared/typings'
import {SearchBox} from '../../components/molecules/SearchBox'
import {Menu} from '../../components/organisms/Menu'
import {TabGroups} from '../../components/organisms/TabGroups'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {tabListsStatsState} from '../../store'

type Props = {
  tabLists: TabLists
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const MemoizedTabGroups = React.memo<{
  tabLists: TabLists
  shouldShowTabGroupCounts: boolean
}>((props) => (
  <TabGroups
    tabLists={props.tabLists}
    shouldShowTabGroupCounts={props.shouldShowTabGroupCounts}
  />
))

const Header: React.VFC<Omit<Props, 'tabLists'>> = (props) => {
  const {query, setQuery} = props
  const totalNum = useRecoilValue(tabListsStatsState)

  return (
    <Row>
      {/* Left */}
      <Col span={16}>
        {/* TODO: need left space 8px */}
        <SearchBox query={query} onChange={setQuery} />
      </Col>
      {/* Right */}
      <Col span={8}>
        <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
          <Text>Total tabs: {totalNum}</Text>
          <Menu />
        </Row>
      </Col>
    </Row>
  )
}

export const List: React.FC<Props> = (props) => {
  const {query, setQuery, tabLists} = props
  const [t, i18n] = useTranslation()
  const [shouldShowTabGroupCounts, _] = useLocalStorage<boolean>(
    'shouldShowTabGroupCounts',
  )

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      {tabLists.length > 0 ? (
        <MemoizedTabGroups
          tabLists={tabLists}
          shouldShowTabGroupCounts={shouldShowTabGroupCounts}
        />
      ) : (
        <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
      )}
    </>
  )
}
