import { Inter } from '@next/font/google'
import styles from '@/lib/styles/home.module.css'
import Header from '@/lib/components/shared/header'
import { CustomHead, Dropdown, Input } from '@/lib/components/shared'
import ProductList from '@/lib/components/shared/product-list'
import { useProductsList } from '@/lib/contexts/product-list/use-product-list.hooks'
import { productRequests } from '@/lib/services/product-list-requests.service'
import { GetServerSidePropsContext } from 'next'
import { DEFAULT_PRODUCT_FILTERS } from '@/lib/contexts/product-list'
import { capitalizeFirstLetter } from '@/lib/utils/string.utils'
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
  initialData: SearchType
}
export default function HomePage({ initialData }: Props) {
  const productList = useProductsList({
    initialData,
  })
  const { products, sort, query, onParamsChange } = productList

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
      <Header>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()

            const form = event.target as HTMLFormElement
            const queryInput = form.elements.namedItem(
              INPUTS_NAME.QUERY
            ) as HTMLInputElement
            const queryValue = queryInput.value

            onParamsChange({
              [INPUTS_NAME.QUERY]: queryValue,
            })
          }}
        >
          <Input
            name={INPUTS_NAME.QUERY}
            type="search"
            defaultValue={query}
            placeholder={SEARCH.PLACEHOLDER}
            endAdornment
            onChange={onParamsChange}
          />
        </form>
      </Header>
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
            <aside className={styles.sidebar}>{/* <Filters /> */}</aside>
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

  const initialFilters = { ...DEFAULT_PRODUCT_FILTERS, ...query }
  const initialData = await productRequests.search(initialFilters)
  console.log(initialData)
  return {
    props: {
      initialData,
    },
  }
}
