import { Button } from '@geist-ui/react'
import React from 'react'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList/TabListContainer'
import { useLoadMore, useLocalStorage } from '~/app/hooks'
import { useFuse } from '~/app/hooks/useFuse'
import { TabList, TabSimple } from '~/shared/typings'
import { TabSimpleLink } from '../../components/molecules/TabSimpleLink'

export const List: React.FC<{ tabLists: TabList[]; tabs: TabSimple[] }> = ({ tabLists, tabs }) => {
  const { searchResults, query, onSearch } = useFuse(tabs, {
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.3,
    findAllMatches: true,
    keys: ['title', 'url'],
  })

  const [isVisibleTabListHeader] = useLocalStorage<boolean>('isVisibleTabListHeader')

  const PER_LOAD_COUNT = 5
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_LOAD_COUNT, tabLists)

  const isShowableHitTabs = query && searchResults

  /** sliced by useLoadMore */
  const homeCurrentTabList = itemsToShow.map((item, idx) => {
    return (
      <TabListContainer
        key={`${item.createdAt}_${item.id}_${idx}`}
        idx={idx}
        isVisibleTabListHeader={isVisibleTabListHeader}
      />
    )
  })

  return (
    <>
      <Header text={'TabX'} onSearch={onSearch} />
      {isShowableHitTabs ? (
        <>
          {searchResults.map((tab, idx) => (
            <TabSimpleLink tab={tab.item} idx={idx} shouldShowOps={false} shouldDeleteTabWhenClicked={false} />
          ))}
        </>
      ) : (
        <>
          {homeCurrentTabList}
          {!isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
        </>
      )}
    </>
  )
}
