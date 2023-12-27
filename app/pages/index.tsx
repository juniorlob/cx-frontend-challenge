import { Inter } from '@next/font/google'
import styles from '@/lib/styles/home.module.css'
import Header from '@/lib/components/shared/header'
import { CustomHead, Dropdown, Input } from '@/lib/components/shared'
import ProductList from '@/lib/components/shared/product-list'
import { useProductsList } from '@/lib/contexts/product-list/use-product-list.hooks'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { GetServerSidePropsContext } from 'next'
import { ProductFilter } from '@/lib/contexts/product-list/product-list.types'
import { DEFAULT_PRODUCT_FILTERS } from '@/lib/contexts/product-list'
import { capitalizeFirstLetter } from '@/lib/utils/string.utils'
import { ProductType } from '@/lib/models/types/product.type'
import { HOME_SEO } from '@/lib/constants/home.constants'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  initialProducts?: ProductType[]
  initialFilters?: ProductFilter
}
export default function HomePage({ initialProducts, initialFilters }: Props) {
  const { products, refetch, filters, onFiltersChange } = useProductsList({
    initialProducts,
    initialFilters,
  })

  return (
    <>
      <CustomHead
        title={
          filters.q
            ? `${capitalizeFirstLetter(filters.q)} - ${HOME_SEO.SITE_NAME}`
            : `${HOME_SEO.TITLE} - ${HOME_SEO.SITE_NAME}`
        }
        description={HOME_SEO.DESCRIPTION}
      />
      <Header>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            refetch()
          }}
        >
          <Input
            name="q"
            type="search"
            defaultValue={initialFilters?.q}
            placeholder="Buscar productos, marcas y más…"
            endAdornment
            onChange={onFiltersChange}
          />
        </form>
      </Header>
      <main className={inter.className}>
        <Dropdown
          name="sort"
          label="Ordenar por:"
          onChange={onFiltersChange}
          options={[
            {
              id: 'relevance',
              name: 'Más relevantes',
            },
            {
              id: 'price_desc',
              name: 'Mayor precio',
            },
          ]}
        />
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
