import { FiltersProps } from '@/lib/components/shared/filters/filters.types'
import styles from './filters.module.css'
import { Filter } from '@/lib/components/shared'
import { filtersRenderer } from '@/lib/renderers'

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleFilterChange = (currentFilter: { [key: string]: string }) => {
    onFilterChange?.(currentFilter)
  }

  const filtersItems = filters.flatMap((filterItem) => {
    const renderFunctions = filtersRenderer[filterItem.id]
    return renderFunctions ? (
      <Filter
        key={filterItem.id}
        filter={filterItem}
        setFilter={handleFilterChange}
        renderFunctions={renderFunctions}
      />
    ) : null
  })

  return <section className={styles.filtersSection}>{filtersItems}</section>
}
export default Filters
