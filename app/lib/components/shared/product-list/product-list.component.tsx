import { ProductListProps } from '@/lib/components/shared/product-list/product-list.types'
import styles from './product-list.module.css'
import ProductCard from '@/lib/components/shared/product-card'
import { PRODUCT_LIST_TEST_IDS } from '@/lib/components/shared/product-list/product-list.constants'
const ProductList = ({ products }: ProductListProps) => {
  return (
    <ol className={styles.productList}>
      {products.map((product) => (
        <li
          key={product.id}
          data-testid={PRODUCT_LIST_TEST_IDS.PRODUCT_CARD}
          className={styles.productListItem}
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  )
}

export default ProductList
