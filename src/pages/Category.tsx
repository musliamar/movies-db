import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore, useDispatch } from '../lib/context'
import { fetchTopRated, fetchByString } from '../lib/queries'
import { IEntriesData, ISingleEntryData } from '../lib/interfaces'
import { SET_PROGRESS_VALUE, RESET_LOADED_IMAGES } from '../lib/constants'
import Search from '../components/Category/Search'
import Spinner from '../components/Spinner'
import './Category.css'

const SingleCard = lazy(async () => await import('../components/Category/SingleCard'))

const links = [
  { slug: 'movie', name: 'Movies' },
  { slug: 'tv', name: 'TV SHOWS' }
]

function Category (): JSX.Element {
  const initialCurrentData: ISingleEntryData[] = []
  const [currentData, setCurrentData] = useState(initialCurrentData)
  const [loading, setLoading] = useState({ message: '', status: '' })
  const { status, message } = loading
  const dispatch = useDispatch()
  const { category } = useParams()
  const { searchInput, loadedImagesOnCategory } = useStore()

  let categoryToFetch: string = category as string
  const queryToFetch: string = searchInput
  if (category === undefined) categoryToFetch = 'tv'

  useEffect(() => {
    if (searchInput.length < 3) {
      fetchTopRated({ categoryToFetch })
        .then((data: IEntriesData) => {
          const { results } = data
          setCurrentData(results.slice(0, 10))
          setLoading({ message: '', status: 'success' })
        }).catch(() => {
          setLoading({ message: 'Unable to find category.', status: 'error' })
          dispatch({ type: SET_PROGRESS_VALUE, payload: 100 })
        })
    } else {
      dispatch({ type: SET_PROGRESS_VALUE, payload: 10 })
      setLoading({ message: '', status: 'loading' })
      fetchByString({ categoryToFetch, queryToFetch })
        .then((data: IEntriesData) => {
          const { results } = data
          if (results.length === 0) {
            setLoading({ message: 'Nothing found for that search term.', status: 'error' })
            dispatch({ type: SET_PROGRESS_VALUE, payload: 100 })
          } else {
            setCurrentData(results)
            setLoading({ message: '', status: 'success' })
          }
        }).catch(() => {
          setLoading({ message: 'Unable to retrieve data.', status: 'error' })
          dispatch({ type: SET_PROGRESS_VALUE, payload: 100 })
        })
    }
  }, [category, searchInput])

  useEffect(() => {
    if ((loadedImagesOnCategory > 0) && (loadedImagesOnCategory < currentData.length)) {
      const percentageOfLoadedImages = (100 * loadedImagesOnCategory) / currentData.length
      dispatch({ type: SET_PROGRESS_VALUE, payload: percentageOfLoadedImages })
    }

    if (loadedImagesOnCategory === currentData.length) {
      dispatch({ type: SET_PROGRESS_VALUE, payload: 100 })
      dispatch({ type: RESET_LOADED_IMAGES })
    }
  }, [loadedImagesOnCategory])

  return (
    <>
      <header>
        <nav>
        {links.map((link) =>
          <Link key={link.slug} className={categoryToFetch === link.slug ? 'checked' : undefined} to={`/${link.slug}`}>{link.name.toUpperCase()}</Link>)}
        </nav>
      </header>
      <Search />
      <main className='entries-container'>
        <>
          {(currentData.length !== 0 && status === 'success') &&
            currentData.map((single): ISingleEntryData =>
            <Suspense key={single.id} fallback={<Spinner />}>
              <SingleCard category={categoryToFetch} data={single} />
            </Suspense>)}
          {status === 'error' && <p className='error'>{message}</p>}
          {status === 'loading' && <Spinner />}
        </>
      </main>
    </>
  )
}

export default Category
