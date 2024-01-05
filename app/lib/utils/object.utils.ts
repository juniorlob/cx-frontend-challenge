export const replaceUndefinedWithNull = <T>(obj: T): T => {
  if (obj === null || obj === undefined) {
    return null as unknown as T
  }

  if (typeof obj !== 'object' || obj instanceof Date) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(replaceUndefinedWithNull) as unknown as T
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      replaceUndefinedWithNull(value),
    ])
  ) as unknown as T
}
