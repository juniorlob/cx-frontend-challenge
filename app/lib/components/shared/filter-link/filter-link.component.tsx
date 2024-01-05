import Link from 'next/link'
import styles from './filter-link.module.css'
import useQueryLinkBuilder from '@/lib/hooks/use-query-link-builder'
import { FilterLinkProps } from '@/lib/components/shared/filter-link/filter-link.types'
import { cx } from '@/lib/utils/class-name.utils'
import iconStyles from '@/lib/styles/icons.module.css'
import { ICONS } from '@/lib/constants/icons.constants'

const FilterLink = ({ value, setFilter }: FilterLinkProps) => {
  const linkBuilder = useQueryLinkBuilder()

  const filterLink = linkBuilder({ [value.filterId]: value.id })
  const removeFilterLink = linkBuilder({ [value.filterId]: '' })
  const isActive = value.active

  return (
    <Link
      className={cx(styles.filterLink, isActive && styles.activeFilterLink)}
      href={isActive ? removeFilterLink : filterLink}
      shallow
      onClick={(event) => {
        event.preventDefault()
        if (isActive) return setFilter({ [value.filterId]: '' })
        setFilter({ [value.filterId]: value.id })
      }}
    >
      <span>{value.name}</span>
      {value.results && (
        <span className={styles.results}>({value.results})</span>
      )}
      {isActive && (
        <span className={cx(styles.removeIcon, iconStyles[ICONS.CLOSE_MS])} />
      )}
    </Link>
  )
}

export default FilterLink
