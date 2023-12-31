import { ReactNode } from 'react'
import styles from './filter.module.css'
import { FilterProps } from '@/lib/components/shared/filter/filter.types'

const Filter: React.FC<FilterProps> = ({
  filter,
  setFilter,
  renderFunctions,
}) => {
  const renderContent = (content: ReactNode): ReactNode[] =>
    Array.isArray(content) ? content : [content]

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>{filter.name}</h3>
      <ul className={styles.filterList}>
        {renderFunctions.flatMap((renderFn, index) => {
          const content = renderFn({ filter, setFilter })
          return renderContent(content).map((item, itemIndex) => (
            <li className={styles.listItem} key={`${index}-${itemIndex}`}>
              {item}
            </li>
          ))
        })}
      </ul>
    </div>
  )
}

export default Filter
