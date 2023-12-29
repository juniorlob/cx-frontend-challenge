import { SEARCH_PARAMS_VALIDATOR } from '@/lib/constants/params.constants'
import { ProductQueryParams } from '@/lib/contexts/product-list/product-list.types'

export const buildUrl = (
  path: string,
  parameters?: { [key: string]: string | string[] | undefined | number }
): string => {
  const url = new URL(path)

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, item))
      } else if (value !== undefined) {
        url.searchParams.append(key, value.toString())
      }
    })
  }

  return url.href
}

export const searchValidParams = (params: ProductQueryParams) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (key in SEARCH_PARAMS_VALIDATOR && SEARCH_PARAMS_VALIDATOR[key](value)) {
      acc[key] = value
    }
    return acc
  }, {} as { [key: string]: string | number })
}
