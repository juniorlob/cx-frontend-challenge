import { Input, Header } from '@/lib/components/shared'
import { SEARCH } from '@/lib/components/shared/search-header/search-header.constants'
import { INPUTS_NAME } from '@/lib/constants/home.constants'
import { useSearch } from '@/store/features/search/use-search.hooks'

const SearchHeader = () => {
  const { onQueryChange, onParamsChange, query } = useSearch()

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
          size="large"
          defaultValue={query}
          placeholder={SEARCH.PLACEHOLDER}
          endAdornment
          onChange={(item) => onQueryChange(item[INPUTS_NAME.QUERY])}
        />
      </form>
    </Header>
  )
}

export default SearchHeader
