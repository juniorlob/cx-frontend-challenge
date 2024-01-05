import Image from 'next/image'
import styles from './product-card.module.css'
import { formatCurrency } from '@/lib/utils/currency.utils'
import { getInstallmentText } from '@/lib/utils/product.utils'
import { ProductCardProps } from '@/lib/components/shared/product-card/product-card.types'
import { TEST_IDS } from '@/lib/components/shared/product-card/product-card.constants'

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <section aria-label={product.title} className={styles.thumbnailWrapper}>
        <Image
          src={product.picture}
          alt={product.title}
          className={styles.thumbnail}
          width={160}
          height={160}
        />
      </section>
      <div className={styles.details}>
        <div className={styles.priceShippingWrapper}>
          <div className={styles.price}>
            {formatCurrency(product.price.amount, product.price.currency)}
            {product.free_shipping && (
              <span
                data-testid={TEST_IDS.SHIPPING_ICON}
                className={styles.freeShipping}
              ></span>
            )}
          </div>
          {product.address?.state_name && (
            <div className={styles.location}>{product.address.state_name}</div>
          )}
        </div>
        <div className={styles.description}>
          <h2 className={styles.title}>{product.title}</h2>
          {product.condition && (
            <div data-testid={TEST_IDS.CONDITION}>{product.condition}</div>
          )}
        </div>
        {product.installments && (
          <p
            data-testid={TEST_IDS.INSTALLMENTS}
            className={styles.installments}
          >
            {getInstallmentText(product)}
          </p>
        )}
      </div>
    </div>
  )
}
export default ProductCard
