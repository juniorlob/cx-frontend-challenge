import { faker } from '@faker-js/faker'

const generateOptions = (numOptions: number) => {
  return Array.from({ length: numOptions }, () => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
    }
  })
}

export const mockOptions = generateOptions(3)
