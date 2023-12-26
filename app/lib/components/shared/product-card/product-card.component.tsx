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
        <div className={styles.priceShippingWrapper}>
          <div className={styles.price}>
            {formatCurrency(product.price.amount, product.price.currency)}
            {product.free_shipping && (
              <span className={styles.freeShipping}></span>
            )}
          </div>
          <div className={styles.location}>Mendoza</div>
        </div>
        <div className={styles.description}>
          <h2 className={styles.title}>{product.title}</h2>
          <div>{product.condition}</div>
        </div>
        {product.installments && (
          <p className={styles.installments}>
            En {product.installments.quantity} cuotas de{' '}
            {formatCurrency(
              product.installments.amount,
              product.price.currency
            )}
          </p>
        )}
      </div>
    </div>
  )
}
export default ProductCard
