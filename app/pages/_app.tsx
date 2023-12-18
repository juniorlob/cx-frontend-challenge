import '@/lib/styles/globals.css'
import '@/lib/styles/variables.css'
import '@/lib/styles/icons.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
