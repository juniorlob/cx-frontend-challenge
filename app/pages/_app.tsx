import '@/lib/styles/globals.css'
import '@/lib/styles/variables.css'
import '@/lib/styles/icons.css'

import type { AppProps } from 'next/app'
import ProductListProvider from '@/lib/contexts/product-list/product-list.provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductListProvider>
      <Component {...pageProps} />
    </ProductListProvider>
  )
}
