import ProductCard from './product-card.component'
import { productModelMock } from '@/lib/mocks/product.mock'
import { formatCurrency } from '@/lib/utils/currency.utils'
import { act, render, screen, axe } from '@/lib/utils/jest-wrapper.utils'
import { TEST_IDS } from '@/lib/components/shared/product-card/product-card.constants'

describe('ProductCard Component', () => {
  const product = productModelMock()

  test('should be accessible', async () => {
    const { container } = await act(async () =>
      render(<ProductCard product={product} />)
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  test('renders the product title', async () => {
    await act(async () => {
      render(<ProductCard product={product} />)
    })

    expect(screen.getByText(product.title)).toBeInTheDocument()
  })

  test('renders the product image', async () => {
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.getByAltText(product.title)).toBeInTheDocument()
  })

  test('renders the product price', async () => {
    const { container } = await act(async () =>
      render(<ProductCard product={product} />)
    )
    const cardElement = container.querySelector('.card')
    const price = cardElement?.querySelector('.price')
    expect(price?.textContent).toBe(
      formatCurrency(product.price.amount, product.price.currency)
    )
  })

  test('renders the free shipping icon if product has free shipping', async () => {
    product.free_shipping = true
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.getByTestId(TEST_IDS.SHIPPING_ICON)).toBeInTheDocument()
  })

  test('does not render the free shipping icon if product does not have free shipping', async () => {
    product.free_shipping = false
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.queryByTestId(TEST_IDS.SHIPPING_ICON)).toBeNull()
  })

  test('renders the product state name', async () => {
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.getByText(product.address.state_name)).toBeInTheDocument()
  })

  test('renders the product condition when it is set to "new"', async () => {
    product.condition = 'new'
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.queryByTestId(TEST_IDS.CONDITION)).toBeInTheDocument()
  })

  test('does not render the product condition when it is undefined', async () => {
    product.condition = undefined
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.queryByTestId(TEST_IDS.CONDITION)).toBeNull()
  })

  test('renders the product installments', async () => {
    await act(async () => {
      render(<ProductCard product={product} />)
    })
    expect(screen.queryByTestId(TEST_IDS.INSTALLMENTS)).toBeInTheDocument()
  })
})
