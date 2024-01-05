import '@/lib/styles/globals.css'
import '@/lib/styles/variables.css'

import type { AppProps } from 'next/app'
import StoreProvider from '@/store/store.provider'
import { makeStore } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  const initialState = makeStore(pageProps.initialReduxState)
  return (
    <StoreProvider initialState={initialState.getState()}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
