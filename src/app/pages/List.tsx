import { Button } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { selector, useRecoilValue } from 'recoil'
import { Header, searchState } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLoadMore, useLocalStorage } from '~/app/hooks'
import { sortTabListsState } from '~/app/stores/tabLists'
import { TabList, TabSimple } from '~/shared/typings'
import { Load } from '../components/atoms/Load'
import { TabSimpleLink } from '../components/molecules/TabSimpleLink'
import { tabsState } from '../stores/tabs'

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

const filteredTabsState = selector({
  key: 'filteredTabsState',
  get: ({ get }) =>
    get(tabsState).filter(
      item => item.title.indexOf(get(searchState).inputText) > -1 || item.url.indexOf(get(searchState).inputText) > -1,
    ),
})

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)
  const filteredTabs = useRecoilValue<TabSimple[]>(filteredTabsState)
  const inputText = useRecoilValue(searchState).inputText

  const { t } = useTranslation()
  const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_COUNT, tabLists)

  const currentTabList = itemsToShow.map((item, idx) => (
    <TabListContainer key={`${item.id}_${idx}`} idx={idx} shouldShowTabListHeader={shouldShowTabListHeader} />
  ))

  const shouldShowFilteredTabs = inputText && filteredTabs
  const shouldShowLoadMore = currentTabList.length > 0 && !isMaxLength

  return (
    <>
      <Header text={'TabX'} />
      {shouldShowFilteredTabs ? (
        <>
          {filteredTabs.map((tab, idx) => (
            <TabSimpleLink tab={tab} idx={idx} shouldShowOps={false} shouldDeleteTabWhenClicked={false} />
          ))}
        </>
      ) : (
        <>
          {tabLists ? (
            <>
              {tabLists.length > 0 ? (
                <>
                  {currentTabList}
                  {shouldShowLoadMore && <Button onClick={handleShowMoreItems}>loadMore</Button>}
                </>
              ) : (
                <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
              )}
            </>
          ) : (
            <Load />
          )}
        </>
      )}
    </>
  )
}
