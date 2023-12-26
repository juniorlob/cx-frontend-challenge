import { apiDataFetcher } from '../utils/request.utils'

export const ROUTE_TYPES = {
  SEARCH: 'search',
}

const API_ROUTE = process.env.NEXT_PUBLIC_API
const PRODUCTS_ROUTE = { [ROUTE_TYPES.SEARCH]: '/sites/MLA/search' }

const createApiRequest = (route: string) =>
  apiDataFetcher(`${API_ROUTE}${PRODUCTS_ROUTE[route]}`)

export const productRequests = {
  [ROUTE_TYPES.SEARCH]: createApiRequest(ROUTE_TYPES.SEARCH),
}
