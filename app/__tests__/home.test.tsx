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
  waitFor,
} from '@/lib/utils/jest-wrapper.utils'
import { Product } from '@/lib/models/classes/product.model'
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { SEARCH } from '@/lib/constants/home.constants'
import { searchMock } from '@/lib/mocks/search.mock'
import { faker } from '@faker-js/faker'

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
      onParamsChange: jest.fn(),
      query: faker.word.words({ count: 1 }),
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
    const { onParamsChange } = mockedUseProductsList({
      initialData: searchMockItem,
    })
    render(<Home initialData={searchMockItem} />)

    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'phone' },
    })
    expect(onParamsChange).toHaveBeenCalledWith({ q: 'phone' })
  })

  it('renders ProductList when there are products', () => {
    const initialData = {
      ...searchMockItem,
      results: [...searchMockItem.results, productMockItem],
    }
    render(<Home initialData={initialData} />)
    expect(screen.getByText(productMockItem.title)).toBeInTheDocument()
  })

  it('calls refetch when the form is submitted', async () => {
    const { onParamsChange } = mockedUseProductsList({
      initialData: searchMockItem,
    })
    render(<Home initialData={searchMockItem} />)

    fireEvent.submit(screen.getByRole('search'))

    expect(onParamsChange).toHaveBeenCalled()
  })

  it('updates the filter when the input value changes', () => {
    const { onParamsChange } = mockedUseProductsList({
      initialData: searchMockItem,
    })
    render(<Home initialData={searchMockItem} />)

    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'laptop' },
    })
    waitFor(
      () => expect(onParamsChange).toHaveBeenCalledWith({ q: 'laptop' }),
      { timeout: 300 }
    )
  })

  it('calls onParamsChange when every dropdown option is selected', () => {
    const {
      onParamsChange,
      sort: { current, available: mockOptions },
    } = mockedUseProductsList({ initialData: searchMockItem })

    render(<Home initialData={searchMockItem} />)

    fireEvent.click(screen.getByText(current!.name))
    mockOptions!.forEach((option) => {
      fireEvent.click(screen.getByText(option.name))
      expect(onParamsChange).toHaveBeenCalledWith({ sort: option.id })
      fireEvent.click(screen.getByText(option.name))
    })
  })

  it('updates product list based on selected dropdown option', () => {
    const sortedProducts = productListModelMock
    mockedUseProductsList.mockReturnValueOnce({
      products: sortedProducts,
      sort: { current: currentSort, available: availableSort },
      onParamsChange: function (): void {},
      refetch: function (): void {},
      query: faker.word.words({ count: 1 }),
    })

    render(<Home initialData={searchMockItem} />)
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
