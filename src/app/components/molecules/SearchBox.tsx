import { Input } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import React from 'react'

type Props = {
  query: string
  onChange: (e: string) => void
}

export const SearchBox: React.VFC<Props> = props => (
  <Input
    size="medium"
    icon={<Search />}
    placeholder="Search…"
    value={props.query}
    onChange={e => props.onChange(e.target.value)}
    // onChange={props.onChange}
  />
)
