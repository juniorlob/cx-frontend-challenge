import { Inter } from '@next/font/google'
import styles from '@/lib/styles/home.module.css'
import {
  CustomHead,
  Dropdown,
  FiltersSidebar,
  SearchHeader,
} from '@/lib/components/shared'
import ProductList from '@/lib/components/shared/product-list'
import { productRequests } from '@/lib/services/search-requests.service'
import { GetServerSidePropsContext } from 'next'
import { capitalizeFirstLetter } from '@/lib/utils/string.utils'
import { HOME_SEO, INPUTS_NAME, SORT } from '@/lib/constants/home.constants'
import { cx } from '@/lib/utils/class-name.utils'
import { useSearch } from '@/store/features/search/use-search.hooks'
import { makeStore } from '@/store'
import {
  searchDataTransform,
  searchValidParams,
} from '@/store/features/search/search.utils'
import { DEFAULT_SEARCH_FILTERS } from '@/store/features/search/search.constants'
import { replaceUndefinedWithNull } from '@/lib/utils/object.utils'
const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const productList = useSearch()
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
      {/* <button onClick={handleQuery}>test</button> */}
      <main className={cx(inter.className, styles.main)}>
        <div className={styles.container}>
          {products.length > 0 &&
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
          {products?.length > 0 && (
            <div className={styles.content}>
              {filters.length > 0 && <FiltersSidebar />}
              <section className={styles.productListWrapper}>
                <ProductList products={products} />
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context

  const filters = { ...DEFAULT_SEARCH_FILTERS, ...query }
  const searchData = await productRequests.search(searchValidParams(filters))
  const initialSearchData = searchDataTransform(searchData)
  const serializableSearchData = replaceUndefinedWithNull(initialSearchData)
  const store = makeStore({ search: serializableSearchData })

  return {
    props: {
      initialReduxState: store.getState(),
    },
  }
}
