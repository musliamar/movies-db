import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useStore } from '../../context'
import { SET_SEARCH } from '../../constants'
import './Search.css'

function Search (): JSX.Element {
  const { searchInput } = useStore()
  const dispatch = useDispatch()
  const [input, setInput] = useState(searchInput)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setInput(value)
    dispatch({ type: SET_SEARCH, payload: value })
  }

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
