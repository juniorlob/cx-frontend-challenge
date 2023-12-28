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
import {
  HOME_SEO,
  INPUTS_NAME,
  SEARCH,
  SORT,
} from '@/lib/constants/home.constants'
import { cx } from '@/lib/utils/class-name.utils'
import { SearchType } from '@/lib/models/types/search.type'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  initialData?: SearchType
  initialFilters?: ProductFilter
}
export default function HomePage({ initialData, initialFilters }: Props) {
  const { products, sort, refetch, filters, onFiltersChange } = useProductsList(
    {
      initialData,
      initialFilters,
    }
  )

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
            name={INPUTS_NAME.QUERY}
            type="search"
            defaultValue={initialFilters?.q}
            placeholder={SEARCH.PLACEHOLDER}
            endAdornment
            onChange={onFiltersChange}
          />
        </form>
      </Header>
      <main className={cx(inter.className, styles.main)}>
        <div className={styles.container}>
          {products.size > 0 && sort.available.length > 0 && (
            <div className={styles.sortWrapper}>
              <Dropdown
                name={INPUTS_NAME.SORT}
                label={SORT.LABEL}
                onChange={onFiltersChange}
                defaultValue={sort.current?.id}
                options={sort.available}
              />
            </div>
          )}
          {products.size > 0 && (
            <section className={styles.productListSection}>
              <div className={styles.productListWrapper}>
                <ProductList products={products} />
              </div>
            </section>
          )}
        </div>
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
      initialData: data,
      initialFilters,
    },
  }
}
