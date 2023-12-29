import { useRouter } from 'next/router'

const useUpdateQueryParams = () => {
  const router = useRouter()

  const updateQueryParams = (
    newParams: Record<string, string | string[] | number | undefined>
  ) => {
    const currentPath = router.pathname
    const currentQuery = router.query

    const updatedQuery = { ...currentQuery, ...newParams }

    router.push({ pathname: currentPath, query: updatedQuery }, undefined, {
      shallow: true,
    })
  }

  return updateQueryParams
}

export default useUpdateQueryParams
