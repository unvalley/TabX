import { Button } from '@geist-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
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

const PER_PAGE = 2

export const List: React.FC<Props> = props => {
  const { tabLists } = props
  const { t } = useTranslation()

  // const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')
  // const { itemsToShow, handleShowMorePosts } = useLoadMore(PER_PAGE, tabLists)
  const [limit, setLimit] = useState(PER_PAGE)
  const [itemsToShow, setItemsToShow] = useState<TabList[]>([])

  const loopWithSlice = (start: number, end: number) => {
    const slicedItems = tabLists.slice(start, end)
    const newItems = [...itemsToShow, ...slicedItems]
    setItemsToShow(newItems)
  }

  useEffect(() => {
    loopWithSlice(0, PER_PAGE)
  }, [])

  const handleShowMorePosts = () => {
    loopWithSlice(limit, limit + PER_PAGE)
    setLimit(limit + PER_PAGE)
  }

  // const currentPageItems = tabLists.slice(offset, offset + PER_PAGE).map((item, idx) => {
  //   return <TabListContainer key={item.id} idx={calcIdx(idx)} shouldShowTabListHeader={shouldShowTabListHeader} />
  // })
  console.log(itemsToShow)

  return (
    <>
      <Header />
      {tabLists.length > 0 ? (
        <>
          {itemsToShow.map((item, idx) => (
            <TabListContainer key={item.id + new Date().getTime()} idx={idx} shouldShowTabListHeader={true} />
          ))}
          <Button onClick={handleShowMorePosts}>loadMore</Button>
        </>
      ) : (
        <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
      )}
    </>
  )
}
