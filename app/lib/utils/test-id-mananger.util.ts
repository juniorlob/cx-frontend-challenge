class TestIdManager {
  private static instance: TestIdManager
  private ids: Set<string>

  private constructor() {
    this.ids = new Set<string>()
  }

  public static getInstance(): TestIdManager {
    if (!TestIdManager.instance) {
      TestIdManager.instance = new TestIdManager()
    }
    return TestIdManager.instance
  }

  public generateTestId(
    base: string,
    ...identifiers: (string | number)[]
  ): string {
    const newId = [base, ...identifiers].join('-')
    if (this.ids.has(newId)) {
      console.warn(`Duplicate test ID detected: ${newId}`)
      return this.generateTestId(base, ...identifiers, 'duplicate')
    }

    this.ids.add(newId)
    return newId
  }
}

export const testIdManager = TestIdManager.getInstance()
