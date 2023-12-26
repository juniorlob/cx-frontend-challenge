import { apiDataFetcher } from '../utils/request.utils'

const ROUTES_TYPES = {
  SEARCH: 'search',
}

const API_ROUTE = process.env.NEXT_PUBLIC_API
const PRODUCTS_ROUTE = { [ROUTES_TYPES.SEARCH]: '/sites/MLA/search' }

const createApiRequest = (route: string) =>
  apiDataFetcher(`${API_ROUTE}${PRODUCTS_ROUTE[route]}`)

export const productRequests = {
  [ROUTES_TYPES.SEARCH]: createApiRequest(ROUTES_TYPES.SEARCH),
}
