import React from 'react'
import '@testing-library/jest-dom'
import { InputRange } from '@/lib/components/shared'
import {
  act,
  axe,
  fireEvent,
  render,
  screen,
} from '@/lib/utils/jest-wrapper.utils'

describe('InputRange Component', () => {
  test('should be accessible', async () => {
    const { container: rangeInputContainer } = await act(async () =>
      render(<InputRange name="testRange" />)
    )
    const rangeInputResults = await axe(rangeInputContainer)
    expect(rangeInputResults).toHaveNoViolations()
  })

  test('it should update values correctly', () => {
    const handleChange = jest.fn()
    render(
      <InputRange
        name="testRange"
        minPlaceholder="Minimum"
        maxPlaceholder="Maximum"
        onChange={handleChange}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Minimum'), {
      target: { value: '10' },
    })
    expect(handleChange).toHaveBeenCalledWith({
      testRange: { min: '10', max: '' },
    })

    fireEvent.change(screen.getByPlaceholderText('Maximum'), {
      target: { value: '20' },
    })
    expect(handleChange).toHaveBeenCalledWith({
      testRange: { min: '10', max: '20' },
    })
  })
})
