import {
  ROUTE_TYPES,
  productRequests,
} from '@/lib/services/search-requests.service'
import { SearchQueryParams } from '@/store/features/search/search.types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'search/fetchProducts',
  async (queryParams: Partial<SearchQueryParams>) => {
    const response = await productRequests[ROUTE_TYPES.SEARCH](queryParams)

    return response
  }
)
