import { Input, Header } from '@/lib/components/shared'
import { SEARCH } from '@/lib/components/shared/search-header/search-header.constants'
import { SearchHeaderProps } from '@/lib/components/shared/search-header/search-header.types'
import { INPUTS_NAME } from '@/lib/constants/home.constants'
import { useProductsList } from '@/lib/contexts/product-list'

const SearchHeader = ({ initialData }: SearchHeaderProps) => {
  const { onParamsChange, query } = useProductsList({
    initialData,
  })

  return (
    <Header>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault()

          const form = event.target as HTMLFormElement
          const queryInput = form.elements.namedItem(
            INPUTS_NAME.QUERY
          ) as HTMLInputElement
          const queryValue = queryInput.value

          onParamsChange({
            [INPUTS_NAME.QUERY]: queryValue,
          })
        }}
      >
        <Input
          name={INPUTS_NAME.QUERY}
          type="search"
          defaultValue={query}
          placeholder={SEARCH.PLACEHOLDER}
          endAdornment
          onChange={onParamsChange}
        />
      </form>
    </Header>
  )
}

export default SearchHeader
