import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
import { TabList } from '~/shared/typings'

type Props = {
  tabLists: TabList[]
}

const MemoizedTabGroups = React.memo<{
  tabLists: TabList[]
  shouldShowTabListHeader: boolean
}>(props => (
  <>
    {props.tabLists.map((tabList, idx) => (
      <TabListContainer key={tabList.id} idx={idx} shouldShowTabListHeader={props.shouldShowTabListHeader} />
    ))}
  </>
))

MemoizedTabGroups.displayName = 'MemoizedTabGroups'

export const List: React.FC<Props> = props => {
  const { tabLists } = props
  const { t } = useTranslation()
  const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')

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
