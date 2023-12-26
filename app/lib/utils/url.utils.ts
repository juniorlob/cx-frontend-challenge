export const buildUrl = (
  path: string,
  parameters?: { [key: string]: string | string[] | undefined }
): string => {
  const url = new URL(path)

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, item))
      } else if (value !== undefined) {
        url.searchParams.append(key, value)
      }
    })
  }

  return url.href
}
