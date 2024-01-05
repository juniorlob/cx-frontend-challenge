import { SearchState } from '@/store/features/search/search.types'
import { PayloadAction } from '@reduxjs/toolkit'

const setQuery = (state: SearchState, action: PayloadAction<string>) => {
  state.query = action.payload
}

export const searchReducers = { setQuery }
