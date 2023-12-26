export const buildUrl = (
  path: string,
  parameters?: { [key: string]: string }
): string => {
  const url = new URL(path)
  const queryString = new URLSearchParams(parameters).toString()
  url.search = queryString
  return url.href
}
