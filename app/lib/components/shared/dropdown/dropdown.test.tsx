import { Dropdown } from '@/lib/components/shared'
import { mockOptions } from '@/lib/components/shared/dropdown/dropdown.mock'
import {
  act,
  axe,
  fireEvent,
  render,
  screen,
} from '@/lib/utils/jest-wrapper.utils'

describe('Dropdown Component', () => {
  test('should be accessible', async () => {
    const { container } = await act(async () =>
      render(
        <Dropdown
          options={mockOptions}
          name="sort"
          defaultValue=""
          onChange={() => {}}
          label="Sort by"
        />
      )
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the dropdown with options', () => {
    render(
      <Dropdown
        options={mockOptions}
        defaultValue=""
        onChange={() => {}}
        label="Sort by"
        name="sortOrder"
      />
    )

    expect(screen.getByText('Sort by')).toBeInTheDocument()

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument()
    })
  })

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn()
    render(
      <Dropdown
        options={mockOptions}
        defaultValue=""
        onChange={handleChange}
        label="Sort by"
        name="sortOrder"
      />
    )

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: mockOptions[1].id },
    })
    expect(handleChange).toHaveBeenCalledWith(mockOptions[1].id)
  })

  it('sets the correct default value', () => {
    const defaultValue = mockOptions[0].id

    render(
      <Dropdown
        options={mockOptions}
        defaultValue={defaultValue}
        onChange={() => {}}
        label="Sort by"
        name="sortOrder"
      />
    )

    expect(screen.getByRole('combobox')).toHaveValue(defaultValue)
  })
})
