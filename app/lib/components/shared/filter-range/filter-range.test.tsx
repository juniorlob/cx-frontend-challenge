import FilterRange from '@/lib/components/shared/filter-range'
import { FILTER_RANGE_TEST_IDS } from '@/lib/components/shared/filter-range/filter-range.constants'
import { rangeValueBuilder } from '@/lib/components/shared/filter-range/filter-range.utils'
import { filterMock } from '@/lib/mocks/filters.mock'
import {
  act,
  axe,
  fireEvent,
  render,
  screen,
} from '@/lib/utils/jest-wrapper.utils'
const filter = filterMock()

describe('FilterRange Component', () => {
  test('should be accessible', async () => {
    const { container: filterRangeContainer } = await act(async () =>
      render(<FilterRange filter={filter} setFilter={jest.fn()} />)
    )
    const filterRangeResults = await axe(filterRangeContainer)
    expect(filterRangeResults).toHaveNoViolations()
  })
  test('should call setFilter when onSubmit is called', () => {
    const mockSetFilter = jest.fn()
    render(<FilterRange filter={filter} setFilter={mockSetFilter} />)

    fireEvent.change(screen.getByPlaceholderText('Mínimo'), {
      target: { value: '10' },
    })
    fireEvent.change(screen.getByPlaceholderText('Máximo'), {
      target: { value: '20' },
    })

    fireEvent.submit(screen.getByTestId(FILTER_RANGE_TEST_IDS.FORM))

    expect(mockSetFilter).toHaveBeenCalledWith({
      [filter.id]: rangeValueBuilder({ min: '10', max: '20' }),
    })
  })
})
