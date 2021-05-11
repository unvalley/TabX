import { Button } from '@geist-ui/react'
import Fuse from 'fuse.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
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
}>(props => {
  console.log('logging')
  return (
    <>
      {props.tabLists.map((tabList, idx) => (
        <TabListContainer
          key={`${tabList.id}_${idx}`}
          idx={idx}
          shouldShowTabListHeader={props.shouldShowTabListHeader}
        />
      ))}
    </>
  )
})

MemoizedTabGroups.displayName = 'MemoizedTabGroups'

const PER_COUNT = 5

const fuzzySearch = (query: string, tabs: TabSimple[]) => {
  const fuse = new Fuse(tabs, {
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.2,
    keys: ['title', 'url', 'domain'],
  })
  const results = fuse.search(query)
  const searchResults = query
    ? results.map(char => {
        return char.item
      })
    : tabs
  return searchResults
}

export const List: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(sortTabListsState)
  const tabs = useRecoilValue<TabSimple[]>(tabsState)
  const inputText = useRecoilValue(searchState).inputText

  const filteredTabs = fuzzySearch(inputText, tabs)

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
