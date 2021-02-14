import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { DomainTabListContainer } from '~/app/components/organisms/DomainTabList'
import { Header } from '~/app/components/organisms/Header'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
import { DomainTabList } from '~/shared/typings'

type Props = {
  tabLists: DomainTabList[]
}

const MemoizedTabGroups = React.memo<{
  tabLists: DomainTabList[]
  shouldShowTabListHeader: boolean
}>(props => (
  <>
    {props.tabLists.map((_tabList, idx) => (
      <DomainTabListContainer key={idx} idx={idx} shouldShowTabListHeader={props.shouldShowTabListHeader} />
    ))}
  </>
))

MemoizedTabGroups.displayName = 'Doma'

export const Domain: React.FC<Props> = props => {
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
