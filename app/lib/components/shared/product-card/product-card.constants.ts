import { testIdManager } from '@/lib/utils/test-id-mananger.util'

const BASE_TEST_ID = 'product-card'

export const TEST_IDS = {
  SHIPPING_ICON: testIdManager.generateTestId(BASE_TEST_ID, 'shipping-icon'),
  CONDITION: testIdManager.generateTestId(BASE_TEST_ID, 'condition'),
  INSTALLMENTS: testIdManager.generateTestId(BASE_TEST_ID, 'installments'),
}
