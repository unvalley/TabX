import { Button } from '@geist-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLoadMore, useLocalStorage } from '~/app/hooks'
import { useFuse } from '~/app/hooks/useFuse'
import { TabList, TabSimple } from '~/shared/typings'
import { TabSimpleLink } from '../../components/molecules/TabSimpleLink'
import { tabsState } from '../../stores/tabs'

const PER_LOAD_COUNT = 5

export const List: React.FC<{ tabLists: TabList[] }> = ({ tabLists }) => {
  const tabs = useRecoilValue<TabSimple[]>(tabsState)
  const { hits, query, onSearch } = useFuse(tabs, {
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.2,
    keys: ['title', 'url'],
  })

  const [isVisibleTabListHeader] = useLocalStorage<boolean>('isVisibleTabListHeader')
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_LOAD_COUNT, tabLists)
  const isShowableHitTabs = query && hits

  /** sliced by useLoadMore */
  const homeCurrentTabList = itemsToShow.map((item, idx) => {
    return (
      <TabListContainer
        key={`${item.id}_${idx}`}
        tabList={item}
        idx={idx}
        isVisibleTabListHeader={isVisibleTabListHeader}
      />
    )
  })

  return (
    <>
      <Header text={'TabX'} query={query} onSearch={onSearch} />
      {isShowableHitTabs ? (
        <>
          {hits.map((tab, idx) => (
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
