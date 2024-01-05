'use client'
import { makeStore } from '@/store/store'
import { AppStore, PreloadState, RootState } from '@/store/store.types'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState: PreloadState
}) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore(initialState)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
