import { testIdManager } from '@/lib/utils/test-id-mananger.util'

const BASE_TEST_ID = 'product-list'

export const PRODUCT_LIST_TEST_IDS = {
  PRODUCT_CARD: testIdManager.generateTestId(BASE_TEST_ID, 'product-card'),
}
