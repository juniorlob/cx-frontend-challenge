import searchSliceReducer from '@/store/features/search'
import { PreloadState } from '@/store/store.types'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = (preloadedState: PreloadState) => {
  return configureStore({
    reducer: {
      search: searchSliceReducer,
    },
    preloadedState,
  })
}
