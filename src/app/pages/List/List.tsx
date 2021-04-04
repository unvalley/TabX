import { Button } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLoadMore } from '~/app/hooks/useLoadMore'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
// import { useLocalStorage } from '~/app/hooks/useLocalStorage'
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
  const perCount = 8
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(perCount, tabLists)

  const currentItems = itemsToShow.map((item, idx) => (
    <TabListContainer key={`${item.id}_${idx}`} idx={idx} shouldShowTabListHeader={shouldShowTabListHeader} />
  ))

  return (
    <>
      <Header text={'TabX'} shouldShowTabStats={true} />
      {tabLists.length > 0 ? (
        <>
          {currentItems}
          {!isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
        </>
      ) : (
        <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
      )}
    </>
  )
}
