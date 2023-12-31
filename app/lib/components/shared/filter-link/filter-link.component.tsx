import Link from 'next/link'
import styles from './filter-link.module.css'
import useQueryLinkBuilder from '@/lib/hooks/use-query-link-builder'
import { FilterLinkProps } from '@/lib/components/shared/filter-link/filter-link.types'

const FilterLink = ({ value, setFilter }: FilterLinkProps) => {
  const linkBuilder = useQueryLinkBuilder()
  const renderLink = linkBuilder({ [value.filterId]: value.id })
  return (
    <Link
      className={styles.filterLink}
      href={renderLink}
      shallow
      onClick={(event) => {
        event.preventDefault()
        setFilter({ [value.filterId]: value.id })
      }}
    >
      <span>{value.name}</span>
      {value.results && (
        <span className={styles.results}>({value.results})</span>
      )}
    </Link>
  )
}

export default FilterLink
