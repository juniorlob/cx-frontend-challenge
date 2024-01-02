import { Filters, Popover } from '@/lib/components/shared'
import { useProductsList } from '@/lib/contexts/product-list'
import styles from './filters-sidebar.module.css'
import { ReactElement, useState } from 'react'
import useBreakpoint from '@/lib/hooks/use-breakpoint'
import { cx } from '@/lib/utils/class-name.utils'
import { PopoverContentChildrenProps } from '@/lib/components/shared/popover/popover.types'

const FiltersSidebar = () => {
  const [open, setOpen] = useState(false)
  const isTablet = useBreakpoint('md')
  const isDesktop = useBreakpoint('lg')

  if (isTablet || isDesktop) return <FiltersSidebarDesktop />
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
  const { filters, onParamsChange } = useProductsList()

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
