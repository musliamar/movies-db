import React from 'react'
import { Link } from 'react-router-dom'

function Header (): JSX.Element {
  return (
      <header>
        <nav>
        <Link to={'/movie'}>Movies</Link>
        <Link to={'/tv'}>TV Shows</Link>
        </nav>
      </header>
  )
}

export default Header
