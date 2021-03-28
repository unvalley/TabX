import { useState, useEffect } from 'react'

export const useLoadMore = <T>(loadCount: number, items: T[]) => {
  const [limit, setLimit] = useState(loadCount)
  const [itemsToShow, setItemsToShow] = useState<T[]>([])

  const loopWithSlice = (start: number, end: number) => {
    const slicedItems = items.slice(start, end)
    const newItems = [...itemsToShow, ...slicedItems]
    setItemsToShow(newItems)
  }

  useEffect(() => {
    loopWithSlice(0, loadCount)
  }, [])

  const handleShowMoreItems = () => {
    loopWithSlice(limit, limit + loadCount)
    setLimit(limit + loadCount)
  }

  const isMaxLength = itemsToShow.length === items.length

  return { itemsToShow, handleShowMoreItems, isMaxLength }
}
