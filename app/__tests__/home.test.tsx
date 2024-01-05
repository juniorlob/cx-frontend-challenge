import React from 'react'
import Home from '@/pages'
import * as searchHook from '@/store/features/search/use-search.hooks'
import {
  act,
  axe,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@/lib/utils/jest-wrapper.utils'
import { sortMock, sortsMock } from '@/lib/mocks/sort.mock'
import { faker } from '@faker-js/faker'
import { SEARCH } from '@/lib/components/shared/search-header/search-header.constants'
import { productMock, productsMock } from '@/lib/mocks/product.mock'
import { filtersMock } from '@/lib/mocks/filters.mock'

jest.mock('@/store/features/search/use-search.hooks')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseProductsList = searchHook.useSearch as jest.MockedFunction<
  typeof searchHook.useSearch
>

const productMockItem = productMock()
const productMocks = productsMock()
const currentSort = sortMock()
const availableSort = [...sortsMock(), currentSort]

describe('Home Page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  beforeEach(() => {
    mockedUseProductsList.mockReturnValue({
      products: [...productMocks, productMockItem],
      sort: {
        available: availableSort,
        current: currentSort,
      },
      onParamsChange: jest.fn(),
      query: faker.word.words({ count: 1 }),
      filters: [],
      onQueryChange: jest.fn(),
    })
  })

  test('should be accessible', async () => {
    const { container } = await act(async () => render(<Home />))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders input and handles search', async () => {
    const { onQueryChange } = mockedUseProductsList()
    await act(async () => {
      render(<Home />)
    })
    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'phone' },
    })
    expect(onQueryChange).toHaveBeenCalledWith('phone')
  })

  it('renders ProductList when there are products', async () => {
    await act(async () => {
      render(<Home />)
    })

    screen.debug()
    expect(screen.getByText(productMockItem.title)).toBeInTheDocument()
  })

  it('calls refetch when the form is submitted', async () => {
    const { onParamsChange } = mockedUseProductsList()
    render(<Home />)
    fireEvent.submit(screen.getByRole('search'))

    expect(onParamsChange).toHaveBeenCalled()
  })

  it('updates the filter when the input value changes', async () => {
    const { onParamsChange } = mockedUseProductsList()
    await act(async () => {
      render(<Home />)
    })

    fireEvent.change(screen.getByPlaceholderText(SEARCH.PLACEHOLDER), {
      target: { value: 'laptop' },
    })
    waitFor(
      () => expect(onParamsChange).toHaveBeenCalledWith({ q: 'laptop' }),
      { timeout: 300 }
    )
  })

  it('calls onParamsChange when every dropdown option is selected', async () => {
    const { onParamsChange, sort } = mockedUseProductsList()

    await act(async () => {
      render(<Home />)
    })

    if (sort && sort.current && sort.available) {
      const { current, available: mockOptions } = sort
      fireEvent.click(screen.getByText(current.name))
      mockOptions.forEach((option) => {
        fireEvent.click(screen.getByText(option.name))
        expect(onParamsChange).toHaveBeenCalledWith({ sort: option.id })
        fireEvent.click(screen.getByText(option.name))
      })
    }
  })

  it('updates product list based on selected dropdown option', async () => {
    const sortedProducts = productMocks
    mockedUseProductsList.mockReturnValueOnce({
      products: sortedProducts,
      sort: { current: currentSort, available: availableSort },
      onParamsChange: function (): void {},
      query: faker.word.words({ count: 1 }),
      filters: filtersMock(),
      onQueryChange: function (): void {},
    })

    await act(async () => {
      render(<Home />)
    })

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
