import Fuse from 'fuse.js'
import { useCallback, useMemo, useState } from 'react'
import { debounce } from 'throttle-debounce'
import { TabSimple } from '~/shared/typings'

// ref: https://bit.ly/3uWJ3JY

export const useFuse = (list: TabSimple[], fuseOptions: Fuse.IFuseOptions<any>) => {
  const [query, updateQuery] = useState('')
  const fuse = useMemo(() => new Fuse(list, fuseOptions), [list, fuseOptions])
  // memoize results whenever the query or options change
  // if query is empty and `matchAllOnEmptyQuery` is `true` then return all list
  // NOTE: we remap the results to match the return structure of `fuse.search()`
  const searchResults = useMemo(() => (query ? fuse.search(query, { limit: 10 }) : []), [fuse, query])
  // debounce updateQuery and rename it `setQuery` so it's transparent
  const setQuery = useCallback(debounce(10, updateQuery), [])
  // pass a handling helper to speed up implementation
  const onSearch = useCallback(e => setQuery(e.target.value), [setQuery])
  // still returning `setQuery` for custom handler implementations
  return {
    searchResults,
    onSearch,
    query,
    setQuery,
  }
}
