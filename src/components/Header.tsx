import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/context'
import './Header.css'

function Header (): JSX.Element {
  const links = [
    { slug: 'movie', name: 'TOP 10 Movies' },
    { slug: 'tv', name: 'TOP 10 TV SHOWS' }
  ]

  const { choosenCategory } = useStore()

  return (
    <header>
        <nav>
        {links.map((link) =>
          <Link key={link.slug} className={choosenCategory === link.slug ? 'checked' : undefined} to={`/${link.slug}`}>{link.name.toUpperCase()}</Link>)}
        </nav>
      </header>
  )
}

export default Header
