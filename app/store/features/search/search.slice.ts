import { createSlice } from '@reduxjs/toolkit'
import searchSelectors from '@/store/features/search/search.selectors'
import { searchDataTransform } from '@/store/features/search/search.utils'
import { fetchProducts } from '@/store/features/search/search.thunks'
import { searchReducers } from '@/store/features/search/search.reducers'
import { INITIAL_STATE } from '@/store/features/search/search.constants'

export const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: searchReducers,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const searchData = searchDataTransform(action.payload)

        state.available_filters = searchData.available_filters
        state.available_sorts = searchData.available_sorts
        state.products = searchData.products
        state.available_filters = searchData.available_filters
        state.filters = searchData.filters
        state.sort = searchData.sort
        state.query = searchData.query
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = new Error('Error fetching products')
        state.loading = false
      })
  },
  selectors: searchSelectors,
})
