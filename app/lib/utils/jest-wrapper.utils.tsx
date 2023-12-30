import * as React from 'react'
import { RenderOptions, render as rtlRender } from '@testing-library/react'
import { ProductListProvider } from '@/lib/contexts/product-list'
import { toHaveNoViolations } from 'jest-axe'

function render(ui: React.ReactElement, options: RenderOptions = {}) {
  expect.extend(toHaveNoViolations)

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export * from 'jest-axe'
export { render }
