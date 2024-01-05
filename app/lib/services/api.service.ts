import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
  reducerPath: 'api', // Unique key for the reducer
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (query) => `search?q=${query}`,
    }),
  }),
})

export const { useGetSearchResultsQuery } = apiService
