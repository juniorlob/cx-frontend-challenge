import { ProductList } from '@/lib/components/shared'
import { PRODUCT_LIST_TEST_IDS } from '@/lib/components/shared/product-list/product-list.constants'
import { productListModelMock } from '@/lib/mocks/product.mock'
import { act, axe, render, screen } from '@/lib/utils/jest-wrapper.utils'

describe('ProductList Component', () => {
  const products = productListModelMock

  test('should be accessible', async () => {
    const { container } = await act(async () =>
      render(<ProductList products={products} />)
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
  it('render a list of products', () => {
    render(<ProductList products={products} />)

    products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument()
    })
    const productCards = screen.getAllByTestId(
      PRODUCT_LIST_TEST_IDS.PRODUCT_CARD
    )
    expect(productCards.length).toBe(products.size)
  })
})
