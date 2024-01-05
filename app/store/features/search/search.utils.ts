import { ATTRIBUTES } from '@/store/features/search/search.constants'
import {
  FilterType,
  GetSearchType,
  SearchParamsValidatorType,
  SearchQueryParams,
  SearchState,
} from '@/store/features/search/search.types'

export const searchDataTransform = (searchData: GetSearchType): SearchState => {
  console.log({ searchData })
  return {
    available_filters: searchData.available_filters,
    filters: searchData.filters || [],
    available_sorts: searchData.available_sorts,
    sort: searchData.sort,
    products: searchData.results.map((product) => ({
      id: product.id,
      title: product.title,
      installments: product.installments,
      address: product.address,
      condition:
        product.attributes.find((attr) => attr.id === ATTRIBUTES.ITEM_CONDITION)
          ?.value_name || product.condition,
      free_shipping: product.shipping.free_shipping,
      picture: product.thumbnail,
      price: {
        currency: product.currency_id,
        amount: product.price,
        decimals: 0,
      },
    })),
    ...(searchData.query && { query: searchData.query }),
  }
}

export const updateFilterValues = (filter: FilterType, isActive: boolean) => {
  return filter.values.map((value) => ({
    ...value,
    active: isActive,
    filterId: filter.id,
  }))
}

export const mergeFilter = (
  availableFilter: FilterType,
  currentFilter?: FilterType
) => {
  const updatedAvailableValues = updateFilterValues(availableFilter, false)
  const currentValues = currentFilter ? currentFilter.values : []
  return {
    ...availableFilter,
    ...currentFilter,
    values: [...updatedAvailableValues, ...currentValues],
  }
}

export const searchValidParams = (params: SearchQueryParams) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (key in SEARCH_PARAMS_VALIDATOR && SEARCH_PARAMS_VALIDATOR[key](value)) {
      acc[key] = value
    }
    return acc
  }, {} as { [key: string]: string | number })
}

export const SEARCH_PARAMS_VALIDATOR: SearchParamsValidatorType = {
  sort: (value: unknown): boolean => {
    return typeof value === 'string'
  },
  price: (value: unknown): boolean => {
    const priceFilterRegex =
      /^(-?\d+(\.\d+)?-\d+(\.\d+)?|\*-?\d+(\.\d+)?|\d+(\.\d+)?-\*|)$/
    return typeof value === 'string' && priceFilterRegex.test(value)
  },
  q: (value: unknown): boolean => {
    return typeof value === 'string'
  },
  limit: (value: unknown): boolean => {
    const limitNumber = Number(value)
    return typeof !isNaN(limitNumber) && limitNumber > 0
  },
}
