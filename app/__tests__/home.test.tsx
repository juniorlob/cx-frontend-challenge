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
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { SEARCH } from '@/lib/constants/home.constants'
import { Search } from '@/lib/models/classes/search.model'
import { searchMock, searchModelMock } from '@/lib/mocks/search.mock'

jest.mock('@/lib/contexts/product-list/use-product-list.hooks')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseProductsList =
  productListHook.useProductsList as jest.MockedFunction<
    typeof productListHook.useProductsList
  >

const productMockItem = productMock()
const searchMockItem = searchMock()
const currentSort = sortMock()
const availableSort = [...sortsMock(), currentSort]

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseProductsList.mockReturnValue({
      products: productListModelMock.set(
        productMockItem.id,
        new Product(productMockItem)
      ),
      sort: {
        available: availableSort,
        current: currentSort,
      },
      refetch: jest.fn(),
      filters: { q: '' },
      onFiltersChange: jest.fn(),
    })
  })

  test('should be accessible', async () => {
    const { container } = await act(async () =>
      render(<Home initialData={searchMockItem} />)
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders input and handles search', () => {
    const { onFiltersChange } = mockedUseProductsList({})
    render(<Home />)

    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'phone' },
    })
    expect(onFiltersChange).toHaveBeenCalledWith({ q: 'phone' })
  })

  it('renders ProductList when there are products', () => {
    const initialData = {
      ...searchMockItem,
      results: [...searchMockItem.results, productMockItem],
    }
    const {} = mockedUseProductsList({ initialData })
    render(<Home />)
    expect(screen.getByText(productMockItem.title)).toBeInTheDocument()
  })

  it('calls refetch when the form is submitted', async () => {
    const { refetch } = mockedUseProductsList({})
    render(<Home initialFilters={{}} />)

    fireEvent.submit(screen.getByRole('search'))

    expect(refetch).toHaveBeenCalled()
  })

  it('updates the filter when the input value changes', () => {
    const { onFiltersChange } = mockedUseProductsList({})
    render(<Home initialFilters={{}} />)

    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'laptop' },
    })

    expect(onFiltersChange).toHaveBeenCalledWith({ q: 'laptop' })
  })

  it('calls onFiltersChange when every dropdown option is selected', () => {
    render(<Home />)
    const {
      onFiltersChange,
      sort: { current, available: mockOptions },
    } = mockedUseProductsList({})
    fireEvent.click(screen.getByText(current.name))
    mockOptions.forEach((option) => {
      fireEvent.click(screen.getByText(option.name))
      expect(onFiltersChange).toHaveBeenCalledWith({ sort: option.id })
      fireEvent.click(screen.getByText(option.name))
    })
  })

  it('updates product list based on selected dropdown option', () => {
    const sortedProducts = productListModelMock
    mockedUseProductsList.mockReturnValueOnce({
      products: sortedProducts,
      filters: {},
      sort: { current: currentSort, available: availableSort },
      onFiltersChange: function (): void {},
      refetch: function (): void {},
    })

    render(<Home />)
    fireEvent.click(screen.getByText(currentSort.name))
    fireEvent.click(
      screen.getByText(
        availableSort.find((item) => item.id !== currentSort.id)?.name || ''
      )
    )
    sortedProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument()
    })
  })
})
