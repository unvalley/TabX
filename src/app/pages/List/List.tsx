import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { TabLists } from '../../../shared/typings'
import { Header } from '../../components/organisms/Header'
import { TabList } from '../../components/organisms/TabList'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type Props = {
  tabLists: TabLists
}

const MemoizedTabGroups = React.memo<{
  tabLists: TabLists
  shouldShowTabListHeader: boolean
}>(props => (
  <>
    {props.tabLists.map((tabList, idx) => (
      <TabList key={tabList.id} idx={idx} shouldShowTabListHeader={props.shouldShowTabListHeader} />
    ))}
  </>
))

MemoizedTabGroups.displayName = 'MemoizedTabGroups'

export const List: React.FC<Props> = props => {
  const { tabLists } = props
  const [t, i18n] = useTranslation()
  const [shouldShowTabListHeader, _] = useLocalStorage<boolean>('shouldShowTabListHeader')

  return (
    <>
      <Header />
      {tabLists.length > 0 ? (
        <MemoizedTabGroups tabLists={tabLists} shouldShowTabListHeader={shouldShowTabListHeader} />
      ) : (
        <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
      )}
    </>
  )
}
