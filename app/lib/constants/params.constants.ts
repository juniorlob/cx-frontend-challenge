import { SearchParamsValidatorType } from '@/lib/types/params.type'

export const SEARCH_PARAMS_VALIDATOR: SearchParamsValidatorType = {
  sort: (value: unknown): boolean => {
    return typeof value === 'string'
  },
  price: (value: unknown): boolean => {
    const priceFilterRegex =
      /^(-?\d+(\.\d+)?-\d+(\.\d+)?|\*-?\d+(\.\d+)?|\d+(\.\d+)?-\*)$/
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
