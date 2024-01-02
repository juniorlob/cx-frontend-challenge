import { generateTestId } from '@/lib/utils/test.utils'

export const RANGE_FILTER_PATTERN = /^[0-9]+([,.][0-9]+)?$/

const BASE_TEST_ID = 'filter-range'

export const FILTER_RANGE_TEST_IDS = {
  FORM: generateTestId(BASE_TEST_ID, 'form'),
}
