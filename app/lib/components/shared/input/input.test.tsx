import Input from '@/lib/components/shared/input'
import { fireEvent, render, screen } from '@/lib/utils/jest-wrapper.utils'

describe('Input', () => {
  it('renders input with correct default values and placeholder', () => {
    const placeholderText = 'Enter text'
    const defaultValue = 'Default value'

    render(
      <Input
        name="test"
        type="text"
        placeholder={placeholderText}
        defaultValue={defaultValue}
      />
    )

    const inputElement = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.value).toBe(defaultValue)
  })

  it('calls onChange handler when input value changes', () => {
    const mockOnChange = jest.fn()
    render(<Input type="text" name="test" onChange={mockOnChange} />)

    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'new value' } })

    expect(mockOnChange).toHaveBeenCalledWith({ test: 'new value' })
  })

  it('renders end adornment if provided', () => {
    const endAdornment = <span>Adornment</span>
    render(<Input type="text" name="test" endAdornment={endAdornment} />)

    const buttonElement = screen.getByText('Adornment')
    expect(buttonElement).toBeInTheDocument()
  })
})
