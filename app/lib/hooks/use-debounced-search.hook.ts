import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { useState, useEffect, useRef } from 'react'

const useDebouncedSearch = <ParamsType, ReturnType>(
  initialParams: ParamsType,
  fetchFunction: (filters: ParamsType) => Promise<ReturnType>,
  debounceTime: number = 300
) => {
  const [params, setParams] = useState<ParamsType>(initialParams)
  const debouncedFilters = useDebounce(params, debounceTime)
  const [data, setData] = useState<ReturnType>()
  const [error, setError] = useState<Error | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      return
    }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters, fetchFunction])

  const onParamsChange = (params: Partial<ParamsType>) =>
    setParams((prev) => ({ ...prev, ...params }))

  return { data, error, params, onParamsChange }
}

export default useDebouncedSearch
