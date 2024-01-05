import {
  ROUTE_TYPES,
  productRequests,
} from '@/lib/services/search-requests.service'
import { createAsyncThunkPrefix } from '@/lib/utils/redux.utils'
import { ACTIONS, SLICE_NAME } from '@/store/features/search/search.constants'
import { SearchQueryParams } from '@/store/features/search/search.types'
import { createAsyncThunk } from '@reduxjs/toolkit'

const FETCH_PRODUCTS_PREFIX = createAsyncThunkPrefix(
  SLICE_NAME,
  ACTIONS.FETCH_PRODUCTS
)

export const fetchProducts = createAsyncThunk(
  FETCH_PRODUCTS_PREFIX,
  async (queryParams: Partial<SearchQueryParams>) => {
    const response = await productRequests[ROUTE_TYPES.SEARCH](queryParams)

    return response
  }
)
