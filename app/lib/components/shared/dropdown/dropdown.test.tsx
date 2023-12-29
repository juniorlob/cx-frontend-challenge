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
          defaultValue={mockOptions[0].id}
          onChange={() => {}}
          label="Sort by"
        />
      )
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
  test('should open dropdown list when button is clicked', () => {
    const [mockOption1] = mockOptions

    render(
      <Dropdown
        options={mockOptions}
        onChange={jest.fn()}
        defaultValue={mockOption1.id}
        label="Test Label"
        name="testDropdown"
      />
    )

    const button = screen.getByText(mockOption1.name)
    fireEvent.click(button)
    const allOptionElements = screen.getAllByRole('option')
    expect(allOptionElements.length).toBe(mockOptions.length)

    mockOptions.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.name })
      ).toBeInTheDocument()
    })
  })

  it('should call onChange when an option is clicked', () => {
    const [mockOption1, mockOption2] = mockOptions

    const mockOnChange = jest.fn()
    render(
      <Dropdown
        options={mockOptions}
        onChange={mockOnChange}
        defaultValue={mockOption1.id}
        label="Test Label"
        name="testDropdown"
      />
    )

    fireEvent.click(screen.getByText(mockOption1.name))
    fireEvent.click(screen.getByText(mockOption2.name))

    expect(mockOnChange).toHaveBeenCalledWith({ testDropdown: mockOption2.id })
  })

  it('should call not onChange when an selected option is clicked', () => {
    const [mockOption1, mockOption2] = mockOptions

    const mockOnChange = jest.fn()

    render(
      <Dropdown
        options={mockOptions}
        onChange={mockOnChange}
        defaultValue={mockOption1.id}
        label="Test Label"
        name="testDropdown"
      />
    )

    fireEvent.click(screen.getByText(mockOption1.name))

    const allOptionElements = screen.getByRole('option', { selected: true })

    fireEvent.click(allOptionElements)

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should close the dropdown list opened when button is clicked', async () => {
    const [mockOption1, mockOption2] = mockOptions

    render(
      <Dropdown
        options={mockOptions}
        defaultValue={mockOption1.id}
        label="Test Label"
        name="testDropdown"
      />
    )

    const button = screen.getByText(mockOption1.name)
    fireEvent.click(button)
    const option2Item = screen.getByText(mockOption2.name)
    expect(option2Item).toBeInTheDocument()
    fireEvent.click(button)
    expect(option2Item).not.toBeInTheDocument()
  })
})
