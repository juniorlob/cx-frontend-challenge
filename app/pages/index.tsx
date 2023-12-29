import { Inter } from '@next/font/google'
import styles from '@/lib/styles/home.module.css'
import {
  CustomHead,
  Dropdown,
  Filters,
  SearchHeader,
} from '@/lib/components/shared'
import ProductList from '@/lib/components/shared/product-list'
import { useProductsList } from '@/lib/contexts/product-list/use-product-list.hooks'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { GetServerSidePropsContext } from 'next'
import { DEFAULT_PRODUCT_FILTERS } from '@/lib/contexts/product-list'
import { capitalizeFirstLetter } from '@/lib/utils/string.utils'
import { HOME_SEO, INPUTS_NAME, SORT } from '@/lib/constants/home.constants'
import { cx } from '@/lib/utils/class-name.utils'
import { SearchType } from '@/lib/models/types/search.type'
import { searchValidParams } from '@/lib/utils/url.utils'
const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const productList = useProductsList()
  const { products, sort, query, filters, onParamsChange } = productList

  return (
    <>
      <CustomHead
        title={
          query
            ? `${capitalizeFirstLetter(query)} - ${HOME_SEO.SITE_NAME}`
            : `${HOME_SEO.TITLE} - ${HOME_SEO.SITE_NAME}`
        }
        description={HOME_SEO.DESCRIPTION}
      />
      <SearchHeader />
      <main className={cx(inter.className, styles.main)}>
        <div className={styles.container}>
          {products.size > 0 &&
            sort?.available &&
            sort.available.length > 0 && (
              <div className={styles.sortWrapper}>
                <Dropdown
                  name={INPUTS_NAME.SORT}
                  label={SORT.LABEL}
                  onChange={onParamsChange}
                  defaultValue={sort.current?.id}
                  options={sort.available}
                />
              </div>
            )}
          <div className={styles.content}>
            <aside className={styles.sidebar}>
              <Filters filters={filters} onFilterChange={onParamsChange} />
            </aside>
            {products.size > 0 && (
              <section className={styles.productListWrapper}>
                <ProductList products={products} />
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context

  const initialFilters = searchValidParams({
    ...DEFAULT_PRODUCT_FILTERS,
    ...query,
  })
  const initialSearchData = await productRequests.search(initialFilters)
  return {
    props: {
      initialSearchData,
    },
  }
}
