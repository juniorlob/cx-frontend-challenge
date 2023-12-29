import Filter from '@/lib/components/shared/filter/filter.component'
import styles from './filters.module.css'
import { FiltersProps } from '@/lib/components/shared/filters/filters.types'

const filters = [
  {
    id: 'price',
    name: 'Precio',
    type: 'range',
    values: [
      {
        id: '*-25000.0',
        name: 'Hasta $ 25.000',
        results: 1,
      },
      {
        id: '25000.0-150000.0',
        name: '$25.000 a $150.000',
        results: 3,
      },
      {
        id: '150000.0-*',
        name: 'Más de $150.000',
        results: 3,
      },
    ],
  },
]

const Filters = ({ filters }: FiltersProps) => {
  return (
    <div>
      {/* {filters.keys().map((key) => (
        <Filter key={key} {...filters.get(key)} />
      ))} */}
    </div>
  )
}
export default Filters
