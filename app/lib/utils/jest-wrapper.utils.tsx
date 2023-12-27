import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ProductListProvider } from '@/lib/contexts/product-list'
import { toHaveNoViolations } from 'jest-axe'

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductListProvider>{children}</ProductListProvider>
)

function render(ui: React.ReactElement, options = {}) {
  expect.extend(toHaveNoViolations)

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProductListProvider>{children}</ProductListProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export * from 'jest-axe'
export { render }
