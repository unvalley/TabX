import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {TabLists} from '../../../shared/typings'
import {Header} from '../../components/organisms/Header'
import {TabGroups} from '../../components/organisms/TabGroups'
import {useLocalStorage} from '../../hooks/useLocalStorage'

type Props = {
  tabLists: TabLists
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

export const List: React.FC<Props> = (props) => {
  const {tabLists} = props
  const [t, i18n] = useTranslation()
  const [shouldShowTabGroupCounts, _] = useLocalStorage<boolean>(
    'shouldShowTabGroupCounts',
  )

  return (
    <>
      <Header />
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
