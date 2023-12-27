export const generateTestId = (
  base: string,
  ...identifiers: (string | number)[]
): string => {
  return [base, ...identifiers].join('-')
}
