import Image from 'next/image'
import styles from './product-card.module.css'
import { ProductCardProps } from './product-card.types'

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <section className={styles.thumbnailWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.thumbnail}
        />
      </section>
      <div className={styles.details}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>$ {product.price}</div>
        {product.shipping.freeShipping && (
          <div className={styles.freeShipping}>Envío gratis</div>
        )}
        <div className={styles.installments}>
          {product.installments.quantity} cuotas de ${' '}
          {product.installments.amount}
        </div>
      </div>
    </div>
  )
}
export default ProductCard
