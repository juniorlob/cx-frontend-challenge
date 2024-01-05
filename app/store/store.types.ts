import searchSlice from '@/store/features/search'
import { makeStore } from '@/store/store'

export type PreloadState = { search: ReturnType<typeof searchSlice> }
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
