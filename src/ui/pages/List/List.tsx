import { Button, Spacer, Loading } from '@geist-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { APP_NAME } from '~/shared/constants'
import { TabList, TabSimple } from '~/shared/typings'
import { Header } from '~/ui/components/Header'
import { STORAGE_KEYS } from '~/ui/constants'
import { useLoadMore, useLocalStorage } from '~/ui/hooks'
import { useFuse } from '~/ui/hooks/useFuse'
import { TabListContainer } from '~/ui/pages/List/components/TabList/TabListContainer'

import { TabSimpleLink } from './components/TabSimpleLink'

// for performance
const PER_LOAD_COUNT = 6

export const List: React.VFC<{ tabLists: TabList[]; tabs: TabSimple[] }> = ({ tabLists, tabs }) => {
  const { searchResults, query, onSearch } = useFuse(tabs, {
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.3,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: ['title', 'url'],
  })
  const { t } = useTranslation()
  const [isVisibleTabListHeader] = useLocalStorage<boolean>(STORAGE_KEYS.IS_VISIBLE_TAB_LIST_HEADER)
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(PER_LOAD_COUNT, tabLists)
  const showHitResults = query && searchResults

  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(true)
  }, [])

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
      {!tabLists.length && <span>{t('TAB_LISTS_EMPTY_MESSAGE')}</span>}
      {hasLoaded ? (
        <div>
          {showHitResults ? (
            <>
              {searchResults.map((tab, index) => (
                <TabSimpleLink
                  key={`${tab.item.id}_${index}`}
                  tab={tab.item}
                  index={index}
                  isOpsVisible={true}
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
      ) : (
        <span>
          <Loading type="success"> Loading Tabs…</Loading>
        </span>
      )}
    </div>
  )
}
