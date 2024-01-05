import { createSlice } from '@reduxjs/toolkit'
import searchSelectors from '@/store/features/search/search.selectors'

import {
  searchExtraReducers,
  searchReducers,
} from '@/store/features/search/search.reducers'
import {
  INITIAL_STATE,
  SLICE_NAME,
} from '@/store/features/search/search.constants'

export const searchSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: searchReducers,
  extraReducers: searchExtraReducers,
  selectors: searchSelectors,
})
