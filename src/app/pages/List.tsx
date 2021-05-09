import { Button } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLoadMore, useLocalStorage } from '~/app/hooks'
import { sortTabListsState } from '~/app/stores/tabLists'
import { TabList } from '~/shared/typings'
import { Load } from '../components/atoms/Load'

const MemoizedTabGroups = React.memo<{
  tabLists: TabList[]
  shouldShowTabListHeader: boolean
}>(props => (
  <>
    {props.tabLists.map((tabList, idx) => (
      <TabListContainer
        key={`${tabList.id}_${idx}`}
        idx={idx}
        shouldShowTabListHeader={props.shouldShowTabListHeader}
      />
    ))}
  </>
))

MemoizedTabGroups.displayName = 'MemoizedTabGroups'

const PER_COUNT = 8

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)
  const { t } = useTranslation()

  const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_COUNT, tabLists)

  const currentTabList = itemsToShow.map((item, idx) => (
    <TabListContainer key={`${item.id}_${idx}`} idx={idx} shouldShowTabListHeader={shouldShowTabListHeader} />
  ))

  return (
    <>
      {tabLists ? (
        <>
          <Header text={'TabX'} />
          {!currentTabList.length && <Load />}
          {tabLists.length > 0 ? (
            <>
              {currentTabList}
              {currentTabList.length >= 1 && !isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
            </>
          ) : (
            <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
          )}
        </>
      ) : (
        <Load />
      )}
    </>
  )
}
