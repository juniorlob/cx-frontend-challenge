import { Filters, Popover } from '@/lib/components/shared'
import styles from './filters-sidebar.module.css'
import { useState } from 'react'
import useBreakpoint from '@/lib/hooks/use-breakpoint'
import { cx } from '@/lib/utils/class-name.utils'
import { PopoverContentChildrenProps } from '@/lib/components/shared/popover/popover.types'
import { useSearch } from '@/store/features/search/use-search.hooks'

const FiltersSidebar = () => {
  const [open, setOpen] = useState(false)
  const isMobile = useBreakpoint('sm')

  if (!isMobile) return <FiltersSidebarDesktop />

  return (
    <>
      <Popover
        onStateChange={setOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        triggerContent={
          <button className={cx(styles.button, open && styles.buttonOpen)}>
            Filtrar
          </button>
        }
      >
        <FiltersSidebarDesktop />
      </Popover>
    </>
  )
}

const FiltersSidebarDesktop: React.FC<PopoverContentChildrenProps> = ({
  onRequestClose,
}) => {
  const { filters, onParamsChange } = useSearch()

  const handleChange = (data: { [key: string]: string }) => {
    onParamsChange(data)
    onRequestClose?.()
  }
  return (
    <aside className={styles.sidebar}>
      <Filters filters={filters} onFilterChange={handleChange} />
    </aside>
  )
}

export default FiltersSidebar
