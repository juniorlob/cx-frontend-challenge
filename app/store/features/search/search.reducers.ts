// import { fetchProducts } from '@/store/features/search/search.thunks'
import { REDUCERS_PREFIX } from '@/store/features/search/search.constants'
import { fetchProducts } from '@/store/features/search/search.thunks'
import { SearchState } from '@/store/features/search/search.types'
import { searchDataTransform } from '@/store/features/search/search.utils'
import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'

const setQuery = (state: SearchState, action: PayloadAction<string>) => {
  state.query = action.payload
}

export const searchExtraReducers = (
  builder: ActionReducerMapBuilder<SearchState>
) => {
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
}

export const searchReducers = { [REDUCERS_PREFIX.SET_QUERY]: setQuery }
