export const cx = (...classNames: Array<string | boolean>) => {
  return classNames.filter(Boolean).join(' ')
}
