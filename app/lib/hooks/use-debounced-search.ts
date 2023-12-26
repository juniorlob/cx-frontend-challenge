import { useState, useEffect } from 'react'
import { useDebounce } from './use-debounce'

const useDebouncedSearch = <FilterType, ReturnType>(
  initialFilters: FilterType,
  fetchFunction: (filters: FilterType) => Promise<ReturnType>,
  debounceTime: number = 300
) => {
  const [filters, setFilters] = useState<FilterType>(initialFilters)
  const debouncedFilters = useDebounce(filters, debounceTime)
  const [data, setData] = useState<ReturnType>()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction(debouncedFilters)
        setData(response)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Error in fetchFunction')
        )
      }
    }

    fetchData()
  }, [debouncedFilters, fetchFunction])
  const onFiltersChange = (filter: Partial<FilterType>) => {
    setFilters((prev) => ({ ...prev, ...filter }))
  }

  return { data, error, onFiltersChange }
}

export default useDebouncedSearch
