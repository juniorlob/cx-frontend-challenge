import { Inter } from '@next/font/google'
import styles from '@/pages/home.module.css'
import Header from '@/lib/components/shared/header'
import { CustomHead, Input } from '@/lib/components/shared'
import ProductList from '@/lib/components/shared/product-list'
import { useProductsList } from '@/lib/contexts/product-list/use-product-list.hooks'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { GetServerSidePropsContext } from 'next'
import { ProductFilter } from '@/lib/contexts/product-list/product-list.types'
import { DEFAULT_PRODUCT_FILTERS } from '@/lib/contexts/product-list'
import { capitalizeFirstLetter } from '@/lib/utils/string.utils'
import { ProductType } from '@/lib/models/types/product.type'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  initialProducts: ProductType[]
  initialFilters: ProductFilter
}
export default function Home({ initialProducts, initialFilters }: Props) {
  const { products, refetch, filters, onFiltersChange } = useProductsList({
    initialProducts,
    initialFilters,
  })

  const headProps = {
    title: filters.q
      ? `${capitalizeFirstLetter(filters.q)} - MercadoLibre`
      : 'Buscar - MercadoLibre',
    description: 'Buscar en MercadoLibre',
  }

  return (
    <>
      <CustomHead {...headProps} />
      <main className={inter.className}>
        <Header>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              refetch()
            }}
          >
            <Input
              name="q"
              type="search"
              defaultValue={initialFilters.q}
              placeholder="Buscar productos, marcas y más…"
              endAdornment
              onChange={onFiltersChange}
            />
          </form>
        </Header>
        {!!(products.size > 0) && (
          <section className={styles.productListSection}>
            <div className={styles.productListWrapper}>
              <ProductList products={products} />
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const initialFilters = { ...DEFAULT_PRODUCT_FILTERS, ...query }
  const data = await productRequests.search(initialFilters)

  return {
    props: {
      initialProducts: data?.results,
      initialFilters,
    },
  }
}
