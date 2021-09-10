import React, { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'

import { tabService } from '~/core/services'
import { APP_NAME } from '~/core/shared/constants'
import { Header } from '~/ui/components/Header'
import { TabListContainer } from '~/ui/components/List/TabList/TabListContainer'
import { STORAGE_KEYS } from '~/ui/constants'
import { useHasLoaded, useLocalStorage } from '~/ui/hooks'
import { favoriteTabListsState } from '~/ui/stores/tabLists'

export const Favorite: React.VFC = () => {
  const [favoriteTabLists, setFavoriteTabLists] = useRecoilState(favoriteTabListsState)

  useLayoutEffect(() => {
    // REFACTOR: not efficient
    try {
      const resetTabLists = async () => {
        const tabLists = await tabService.getAllFavoriteTabList()
        setFavoriteTabLists(tabLists)
      }
      resetTabLists()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const [isVisibleTabListHeader] = useLocalStorage<boolean>(STORAGE_KEYS.IS_VISIBLE_TAB_LIST_HEADER)
  const [hasLoaded] = useHasLoaded()

  return (
    <>
      <Header text={APP_NAME} />
      {!favoriteTabLists.length && <p>お気に入りが空です。タブグループのヘッダーより、お気に入りを追加できます</p>}
      {hasLoaded && (
        <>
          {/** sliced by useLoadMore */}
          {favoriteTabLists.map((item, index) => {
            return (
              <TabListContainer
                key={`${item.createdAt}_${item.id}_${index}`}
                index={index}
                isVisibleTabListHeader={isVisibleTabListHeader}
              />
            )
          })}
        </>
      )}
    </>
  )
}
