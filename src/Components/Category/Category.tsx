import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../../lib/context'
import { fetchTopRated, fetchByString } from '../../lib/queries'
import { IEntriesData, ISingleEntryData } from '../../lib/interfaces'
import Search from '../Search/Search'
import SingleCard from './SingleCard'
import './Category.css'

const links = [
  'movie',
  'tv'
]

function Category (): JSX.Element {
  const initialCurrentData: ISingleEntryData[] = []
  const [currentData, setCurrentData] = useState(initialCurrentData)
  const [error, setError] = useState('')
  const { category } = useParams()
  const { searchInput } = useStore()

  let categoryToFetch: string = category as string
  const queryToFetch: string = searchInput
  if (category === undefined) categoryToFetch = 'tv'

  useEffect(() => {
    if (searchInput.length < 3) {
      setError('')
      fetchTopRated({ categoryToFetch })
        .then((data: IEntriesData) => {
          const { results } = data
          setError('')
          setCurrentData(results.slice(0, 10))
        }).catch(() => {
          setError('Unable to find category.')
        })
    } else {
      fetchByString({ categoryToFetch, queryToFetch })
        .then((data: IEntriesData) => {
          const { results } = data
          if (results.length === 0) {
            setError('Nothing found for that search term.')
          } else {
            setError('')
            setCurrentData(results)
          }
        }).catch(() => {
          setError('Unable to retrieve data.')
        })
    }
  }, [category, searchInput])

  return (
    <>
      <header>
        <nav>
        {links.map((link) =>
          <Link key={link} className={categoryToFetch === link ? 'checked' : undefined} to={`/${link}`}>{link.toUpperCase()}</Link>)}
        </nav>
      </header>
      <Search />
      <main className='entries-container'>
        <>
          {(currentData.length !== 0 && error === '') &&
            currentData.map((single): ISingleEntryData =>
              <SingleCard key={single.id} category={categoryToFetch} data={single} />)}
          {error !== '' && <p className='error'>{error}</p>}
        </>
      </main>
    </>
  )
}

export default Category
