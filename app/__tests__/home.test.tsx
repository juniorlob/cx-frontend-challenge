import React from 'react'
import Home from '@/pages'
import * as productListHook from '@/lib/contexts/product-list/use-product-list.hooks'
import { productListModelMock, productMock } from '@/lib/mocks/product.mock'
import {
  act,
  axe,
  fireEvent,
  render,
  screen,
} from '@/lib/utils/jest-wrapper.utils'
import { Product } from '@/lib/models/classes/product.model'

jest.mock('@/lib/contexts/product-list/use-product-list.hooks')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseProductsList =
  productListHook.useProductsList as jest.MockedFunction<
    typeof productListHook.useProductsList
  >

const productMockItem = productMock()

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseProductsList.mockReturnValue({
      products: productListModelMock.set(
        productMockItem.id,
        new Product(productMockItem)
      ),
      refetch: jest.fn(),
      filters: { q: '' },
      onFiltersChange: jest.fn(),
    })
  })

  test('should be accessible', async () => {
    const { container } = await act(async () =>
      render(<Home initialProducts={[productMockItem]} />)
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders input and handles search', () => {
    const { onFiltersChange } = mockedUseProductsList({})
    render(<Home initialProducts={[]} initialFilters={{}} />)

    fireEvent.change(screen.getByPlaceholderText(/buscar productos/i), {
      target: { value: 'phone' },
    })
    expect(onFiltersChange).toHaveBeenCalledWith({ q: 'phone' })
  })

  it('renders ProductList when there are products', () => {
    const initialProducts = [productMockItem]
    const {} = mockedUseProductsList({ initialProducts })
    render(<Home />)
    expect(screen.getByText(productMockItem.title)).toBeInTheDocument()
  })

  it('calls refetch when the form is submitted', async () => {
    const { refetch } = mockedUseProductsList({})
    render(<Home initialProducts={[]} initialFilters={{}} />)

    fireEvent.submit(screen.getByRole('search'))

    expect(refetch).toHaveBeenCalled()
  })

  it('updates the filter when the input value changes', () => {
    const { onFiltersChange } = mockedUseProductsList({})
    render(<Home initialProducts={[]} initialFilters={{}} />)

    fireEvent.change(screen.getByPlaceholderText(/buscar productos/i), {
      target: { value: 'laptop' },
    })

    expect(onFiltersChange).toHaveBeenCalledWith({ q: 'laptop' })
  })
})
