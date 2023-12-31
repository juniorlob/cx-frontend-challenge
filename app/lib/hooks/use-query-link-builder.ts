import { ParamsType } from '@/lib/types/params.type'
import { useRouter } from 'next/router'

const useQueryLinkBuilder = () => {
  const router = useRouter()

  const buildQueryLink = (updatedParams: ParamsType) => {
    const currentPath = router.pathname
    const currentQuery = router.query
    const newQuery = { ...currentQuery, ...updatedParams }

    return {
      pathname: currentPath,
      query: newQuery,
    }
  }

  return buildQueryLink
}

export default useQueryLinkBuilder
