import { buildUrl } from '@/lib/utils/url.utils'

export class HttpService {
  async get(
    url: string,
    params?: { [key: string]: string | string[] | undefined | number }
  ) {
    const response = await fetch(buildUrl(url, params))

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json()
  }
}
