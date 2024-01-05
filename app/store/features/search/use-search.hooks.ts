import { useAppSelector, useAppDispatch } from '@/store/redux.hooks'
import {
  getMergedFilterOptions,
  getSearchParams,
  getSortOptions,
  getSearchQuery,
  getSearchProducts,
  setQuery,
  fetchProducts,
} from '@/store/features/search'

import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { useEffect } from 'react'
import useUpdateQueryParams from '@/lib/hooks/use-update-query-params.hook'
import { SearchQueryParams } from '@/store/features/search/search.types'

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const searchProducts = useAppSelector(getSearchProducts)
  const filters = useAppSelector(getMergedFilterOptions)
  const sortOptions = useAppSelector(getSortOptions)
  const searchQuery = useAppSelector(getSearchQuery)
  const searchParams = useAppSelector(getSearchParams)
  const debouncedQuery = useDebounce(searchQuery, 300)
  const updateQueryParams = useUpdateQueryParams()

  const onParamsChange = (params: Partial<SearchQueryParams>) => {
    const combinedParams = { ...searchParams, ...params }
    dispatch(fetchProducts(combinedParams))
    updateQueryParams(combinedParams)
  }

  const onQueryChange = (query: string) => {
    dispatch(setQuery(query))
  }

  useEffect(() => {
    onParamsChange({ q: debouncedQuery })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  const value = {
    products: searchProducts,
    sort: sortOptions,
    onParamsChange,
    onQueryChange,
    query: searchQuery,
    filters: filters,
  }

  return value
}
