import React, { ChangeEvent, useState, useEffect } from 'react'
import { useDispatch, useStore } from '../../lib/context'
import { SET_SEARCH } from '../../lib/constants'

function Search (): JSX.Element {
  const { searchInput } = useStore()
  const dispatch = useDispatch()
  const [input, setInput] = useState(searchInput)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setInput(value)
  }

  useEffect(() => {
    const startFetch = setTimeout(() => {
      dispatch({ type: SET_SEARCH, payload: input })
    }, 1000)
    return () => clearTimeout(startFetch)
  }, [input])

  return (
    <>
      <input
        type="text"
        id="search"
        placeholder="Search"
        name="search"
        value={input}
        onChange={(e) => handleChange(e)}
      />
    </>
  )
}

export default Search
