export type SearchParamsValidatorType = {
  readonly sort: (value: unknown) => void
  readonly price: (value: unknown) => boolean
  readonly q: (value: unknown) => void
  readonly limit: (value: unknown) => void
  [key: string]: (value: unknown) => void | boolean
}
