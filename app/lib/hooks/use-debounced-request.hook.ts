import { useDebounce } from '@/lib/hooks/use-debounce.hook'
import { ParamsType } from '@/lib/types/params.type'
import { useState, useEffect } from 'react'

const useDebouncedSearch = <ReturnType>(
  initialParams: ParamsType,
  fetchFunction: (filters: ParamsType) => Promise<ReturnType>,
  debounceTime: number = 300
) => {
  const [params, setParams] = useState<ParamsType>(initialParams)
  const debouncedParams = useDebounce(params, debounceTime)
  const [data, setData] = useState<ReturnType>()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction(debouncedParams)
        setData(response)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Error in fetchFunction')
        )
      }
    }
    fetchData()
  }, [debouncedParams, fetchFunction])

  const onParamsChange = (params: Partial<ParamsType>) =>
    setParams((prev) => ({ ...prev, ...params }))

  return {
    data,
    error,
    debouncedParams: debouncedParams,
    params,
    onParamsChange,
  }
}

export default useDebouncedSearch
