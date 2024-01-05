import { searchSlice } from '@/store/features/search/search.slice'
export * from '@/store/features/search/search.thunks'
export const { setQuery } = searchSlice.actions
export const {
  getSortOptions,
  getMergedFilterOptions,
  getSearchParams,
  getSearchQuery,
  getSearchProducts,
} = searchSlice.selectors
export default searchSlice.reducer
