import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './Header/Header'
import Search from './Search/Search'
import { fetchTopRated, fetchByString } from '../queries'
import { IEntriesData, ISingleEntryData } from '../interfaces'
import { useStore, useDispatch } from '../context'
import { SET_CURRENT_DATA, SET_ERROR, SET_CURRENT_SINGLE } from '../constants'
import './Category.css'

function Category (): JSX.Element {
  const { category } = useParams()
  const { currentData, error, searchInput } = useStore()
  const dispatch = useDispatch()
  let categoryToFetch: string = category as string
  const queryToFetch: string = searchInput
  if (category === undefined) categoryToFetch = 'movie'

  useEffect(() => {
    if (searchInput.length < 3) {
      fetchTopRated({ categoryToFetch }).then((data: IEntriesData) => {
        const { results } = data
        dispatch({ type: SET_CURRENT_DATA, payload: results.slice(0, 10) })
        dispatch({ type: SET_CURRENT_SINGLE, payload: {} })
      })
        .catch(() => {
          dispatch({
            type: SET_ERROR,
            payload: 'Error with retrieving data.'
          })
        })
    } else {
      fetchByString({ categoryToFetch, queryToFetch }).then((data: IEntriesData) => {
        const { results } = data
        dispatch({ type: SET_CURRENT_DATA, payload: results.slice(0, 10) })
        dispatch({ type: SET_CURRENT_SINGLE, payload: {} })
      })
        .catch(() => {
          dispatch({
            type: SET_ERROR,
            payload: 'Error with retrieving data.'
          })
        })
    }
  }, [category, searchInput])

  return (
      <>
      <Header />
      <Search />
      <main className='entries-container'>
        {(currentData.length !== 0 && error === '') &&
        <>
            {currentData.map((single): ISingleEntryData => {
              const { id, poster_path: POSTER_PATH, original_title: ORIGINAL_TITLE, name: NAME } = single
              return (
              <div key={id} className='entry-card'>
                <Link to={`/${categoryToFetch}/${id as number}`}>
                  <img className='entry-poster' src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${POSTER_PATH as string}`} />
                  {(ORIGINAL_TITLE != null) && <span className='entry-name'>{ORIGINAL_TITLE}</span>}
                  {(NAME != null) && <span className='entry-name'>{NAME}</span>}
                </Link>
              </div>)
            })}
        </>}

        {error !== '' &&
        <>
            <p>{error}</p>
        </>}
      </main>
      </>
  )
}

export default Category
