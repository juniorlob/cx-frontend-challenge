import { HttpService } from '../services/http.service'

export const apiDataFetcher =
  (apiRoute: string) =>
  async (filters: Record<string, string | undefined | string[]>) => {
    if (!apiRoute) {
      console.warn('apiRoute is required')
      return
    }
    const http = new HttpService()
    return await http.get(apiRoute, filters)
  }
