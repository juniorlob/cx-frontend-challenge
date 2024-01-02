import FilterRange from '@/lib/components/shared/filter-range'
import { filterModelMock } from '@/lib/mocks/filters.mock'
import { act, axe, render } from '@/lib/utils/jest-wrapper.utils'

describe('FilterRange Component', () => {
  test('should be accessible', async () => {
    const { container: filterRangeContainer } = await act(async () =>
      render(<FilterRange filter={filterModelMock()} setFilter={jest.fn()} />)
    )
    const filterRangeResults = await axe(filterRangeContainer)
    expect(filterRangeResults).toHaveNoViolations()
  })
})
