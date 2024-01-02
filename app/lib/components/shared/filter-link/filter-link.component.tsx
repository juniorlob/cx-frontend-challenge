import Link from 'next/link'
import styles from './filter-link.module.css'
import useQueryLinkBuilder from '@/lib/hooks/use-query-link-builder'
import { FilterLinkProps } from '@/lib/components/shared/filter-link/filter-link.types'
import { cx } from '@/lib/utils/class-name.utils'

const FilterLink = ({ value, setFilter }: FilterLinkProps) => {
  const linkBuilder = useQueryLinkBuilder()
  const filterLink = linkBuilder({ [value.filter.id]: value.id })
  const removeFilterLink = linkBuilder({ [value.filter.id]: '' })
  const isActive = value.isActive

  return (
    <Link
      className={cx(styles.filterLink, isActive && styles.activeFilterLink)}
      href={isActive ? removeFilterLink : filterLink}
      shallow
      onClick={(event) => {
        event.preventDefault()
        if (isActive) return setFilter({ [value.filter.id]: '' })
        setFilter({ [value.filter.id]: value.id })
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
