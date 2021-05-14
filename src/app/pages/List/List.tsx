import { Button } from '@geist-ui/react'
import Fuse from 'fuse.js'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { Header, searchState } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLoadMore, useLocalStorage } from '~/app/hooks'
import { TabList, TabSimple } from '~/shared/typings'
import { TabSimpleLink } from '../../components/molecules/TabSimpleLink'
import { tabsState } from '../../stores/tabs'

const PER_COUNT = 5

const fuzzySearch = (query: string, tabs: TabSimple[]) => {
  const fuse = new Fuse(tabs, {
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.1,
    keys: ['title', 'url'],
  })
  const results = fuse.search(query)
  const searchResults = query
    ? results.slice(0, 10).map(char => {
        return char.item
      })
    : []
  return searchResults
}

export const List: React.FC<{ tabLists: TabList[] }> = ({ tabLists }) => {
  const tabs = useRecoilValue<TabSimple[]>(tabsState)
  const inputText = useRecoilValue(searchState).inputText
  const filteredTabs = useMemo(() => fuzzySearch(inputText, tabs), [inputText])

  const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')

  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_COUNT, tabLists)

  const currentTabList = itemsToShow.map((item, idx) => {
    return (
      <TabListContainer
        key={`${item.id}_${idx}`}
        tabList={item}
        idx={idx}
        shouldShowTabListHeader={shouldShowTabListHeader}
      />
    )
  })

  const shouldShowFilteredTabs = inputText && filteredTabs
  const shouldShowLoadMore = !isMaxLength

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
          {currentTabList}
          {shouldShowLoadMore && <Button onClick={handleShowMoreItems}>loadMore</Button>}
        </>
      )}
    </>
  )
}
