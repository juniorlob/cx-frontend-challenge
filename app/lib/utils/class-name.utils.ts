export const cx = (...classNames: Array<string | boolean | undefined>) => {
  return classNames.filter(Boolean).join(' ')
}
