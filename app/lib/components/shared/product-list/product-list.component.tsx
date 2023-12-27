import { ProductListProps } from '@/lib/components/shared/product-list/product-list.types'
import styles from './product-list.module.css'
import ProductCard from '@/lib/components/shared/product-card'
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
