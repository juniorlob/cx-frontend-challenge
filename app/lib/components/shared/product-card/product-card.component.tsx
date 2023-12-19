import Image from 'next/image'
import styles from './product-card.module.css'
import { ProductCardProps } from './product-card.types'
import { formatCurrency } from '@/lib/utils/currency.utils'

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <section aria-label={product.title} className={styles.thumbnailWrapper}>
        <img
          src={product.picture}
          alt={product.title}
          className={styles.thumbnail}
        />
      </section>
      <div className={styles.details}>
        <div className={styles.price}>
          {formatCurrency(product.price.amount, product.price.currency)}
        </div>
        {product.free_shipping && <div className={styles.freeShipping}></div>}
        <div className={styles.title}>{product.title}</div>

        <div className={styles.installments}>
          {product.installments.quantity} cuotas de ${' '}
          {product.installments.amount}
        </div>
      </div>
    </div>
  )
}
export default ProductCard
