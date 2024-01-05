import { SearchState } from '@/store/features/search/search.types'

export const INITIAL_STATE: SearchState = {
  available_filters: [],
  products: [],
  available_sorts: [],
  query: '',
  filters: [],
  loading: false,
}

export const ATTRIBUTES = {
  ITEM_CONDITION: 'ITEM_CONDITION',
}

export const DEFAULT_SEARCH_FILTERS = {
  limit: Number(process.env.NEXT_PUBLIC_MELI_QUERY_LIMIT) || 10,
}
