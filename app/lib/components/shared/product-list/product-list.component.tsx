import ProductCard from '../product-card'
import { ProductListProps } from './product-list.types'
import styles from './product-list.module.css'
const ProductList = ({ products }: ProductListProps) => {
  return (
    <ol className={styles.productList}>
      {Array.from(products.entries()).map(([id, product]) => (
        <li key={product.id} className={styles.productListItem}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  )
}

export default ProductList
