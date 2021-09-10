import { Button, Spacer } from '@geist-ui/react'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { APP_NAME } from '~/core/shared/constants'
import { TabList } from '~/core/shared/typings'
import { Header } from '~/ui/components/Header'
import { TabListContainer } from '~/ui/components/List/TabList/TabListContainer'
import { STORAGE_KEYS } from '~/ui/constants'
import { useHasLoaded, useLoadMore, useLocalStorage } from '~/ui/hooks'
import { favoriteTabListsState } from '~/ui/stores/tabLists'

export const Favorite: React.VFC = () => {
  const favoriteTabLists = useRecoilValue<TabList[]>(favoriteTabListsState)

  const [isVisibleTabListHeader] = useLocalStorage<boolean>(STORAGE_KEYS.IS_VISIBLE_TAB_LIST_HEADER)
  const [hasLoaded] = useHasLoaded()
  const perLoadCount = useMemo(() => (isVisibleTabListHeader ? 6 : 10), [isVisibleTabListHeader])
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(perLoadCount, favoriteTabLists)

  return (
    <>
      <Header text={APP_NAME} />
      {!favoriteTabLists.length && <p>お気に入りが空です。タブグループのヘッダーより、お気に入りを追加できます</p>}
      {hasLoaded && (
        <>
          {/** sliced by useLoadMore */}
          {itemsToShow.map((item, index) => {
            return (
              <TabListContainer
                key={`${item.createdAt}_${item.id}_${index}`}
                index={index}
                isVisibleTabListHeader={isVisibleTabListHeader}
              />
            )
          })}
          <Spacer y={1} />
          {!isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
        </>
      )}
    </>
  )
}
