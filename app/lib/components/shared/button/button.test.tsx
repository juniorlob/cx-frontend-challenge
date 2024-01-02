import Button from '@/lib/components/shared/button'
import { BUTTON_VARIANTS } from '@/lib/components/shared/button/button.constants'
import { ICONS } from '@/lib/constants/icons.constants'
import { render, act, axe } from '@/lib/utils/jest-wrapper.utils'

describe('Button Component', () => {
  it('should be accessible', async () => {
    const { container: iconButtonContainer } = await act(async () =>
      render(
        <Button
          type={BUTTON_VARIANTS.ICON}
          icon={ICONS.CHEVRON_UP_O}
          theme="primary"
        >
          button test
        </Button>
      )
    )
    const iconButtonResults = await axe(iconButtonContainer)
    expect(iconButtonResults).toHaveNoViolations()
  })
})
