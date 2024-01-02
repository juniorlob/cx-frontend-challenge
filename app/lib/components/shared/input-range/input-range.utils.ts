import {
  RangeInputAction,
  RangeInputState,
} from '@/lib/components/shared/input-range/input-range.types'

export const inputRangeReducer = (
  state: RangeInputState,
  action: RangeInputAction
): RangeInputState => {
  switch (action.type) {
    case 'setMin':
      return { ...state, min: action.value }
    case 'setMax':
      return { ...state, max: action.value }
    default:
      return state
  }
}
