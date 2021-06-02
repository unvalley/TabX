import { Button } from '@geist-ui/react'
import React from 'react'

import { APP_NAME } from '~/shared/constants'
import { TabList, TabSimple } from '~/shared/typings'
import { Header } from '~/ui/components/Header'
import { useLoadMore, useLocalStorage } from '~/ui/hooks'
import { useFuse } from '~/ui/hooks/useFuse'
import { TabListContainer } from '~/ui/pages/List/components/TabList/TabListContainer'

import { TabSimpleLink } from './components/TabSimpleLink'

export const List: React.VFC<{ tabLists: TabList[]; tabs: TabSimple[] }> = ({ tabLists, tabs }) => {
  const { searchResults, query, onSearch } = useFuse(tabs, {
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.3,
    findAllMatches: true,
    keys: ['title', 'url'],
  })

  const [isVisibleTabListHeader] = useLocalStorage<boolean>('isVisibleTabListHeader')

  const PER_LOAD_COUNT = 6
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_LOAD_COUNT, tabLists)

  const isShowableHitTabs = query && searchResults

  /** sliced by useLoadMore */
  const homeCurrentTabList = itemsToShow.map((item, index) => {
    return (
      <TabListContainer
        key={`${item.createdAt}_${item.id}_${index}`}
        index={index}
        isVisibleTabListHeader={isVisibleTabListHeader}
      />
    )
  })

  return (
    <div>
      <Header text={APP_NAME} onSearch={onSearch} />
      {isShowableHitTabs ? (
        <>
          {searchResults.map((tab, index) => (
            <TabSimpleLink
              key={`${tab.item.id}_${index}`}
              tab={tab.item}
              index={index}
              isOpsVisible={false}
              shouldDeleteTabWhenClicked={false}
            />
          ))}
        </>
      ) : (
        <>
          {homeCurrentTabList}
          <Spacer y={1} />
          {!isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
        </>
      )}
    </div>
  )
}
