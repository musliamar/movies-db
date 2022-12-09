import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Search from './Search/Search'
import { fetchTopRated, fetchByString } from '../queries'
import { IEntriesData, ISingleEntryData } from '../interfaces'
import { useStore, useDispatch } from '../context'
import { SET_CURRENT_DATA, SET_ERROR, SET_CURRENT_SINGLE } from '../constants'
import './Category.css'

const links = [
  'movie',
  'tv'
]

function Category (): JSX.Element {
  const { category } = useParams()
  const { currentData, error, searchInput } = useStore()
  const dispatch = useDispatch()
  const [hover, setHover] = useState(0)

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
            payload: 'Unable to find category.'
          })
        })
    } else {
      fetchByString({ categoryToFetch, queryToFetch }).then((data: IEntriesData) => {
        const { results } = data
        if (results.length === 0) {
          dispatch({
            type: SET_ERROR,
            payload: 'Nothing found for that search term.'
          })
        } else {
          dispatch({ type: SET_CURRENT_DATA, payload: results })
          dispatch({ type: SET_CURRENT_SINGLE, payload: {} })
        }
      })
        .catch(() => {
          dispatch({
            type: SET_ERROR,
            payload: 'Unable to retrieve data.'
          })
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
        {(currentData.length !== 0 && error === '') &&
        <>
            {currentData.map((single): ISingleEntryData => {
              const { id, overview: OVERVIEW, vote_average: AVERAGE_VOTE, vote_count: NUMBER_OF_VOTES, poster_path: POSTER_PATH, original_title: ORIGINAL_TITLE, name: NAME } = single
              const SHORT_OVERVIEW = OVERVIEW?.substring(0, 150)

              return (
                <Link
                  to={`/${categoryToFetch}/${id as number}`}
                  onMouseEnter={() => setHover(id as number)}
                  onMouseLeave={() => setHover(0)}
                  key={id}
                  className='entry-card'>
                  <div className='poster-wrapper'>
                    <img className={hover === id ? 'entry-poster opacity' : 'entry-poster'} src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${POSTER_PATH as string}`} />
                    {hover === id &&
                    <>
                    <div className='average-vote'>
                      <span className='average-vote-text'>avg. vote</span>
                      <span className='average-vote-label'>{AVERAGE_VOTE}</span>
                    </div>
                    <div className='number-of-votes'>
                      {NUMBER_OF_VOTES} votes
                    </div>
                    <div className='overview'>
                      {`${SHORT_OVERVIEW as string}...`}
                    </div>
                    </>}
                  </div>
                  {(ORIGINAL_TITLE != null) && <span className='entry-name'>{ORIGINAL_TITLE}</span>}
                  {(NAME != null) && <span className='entry-name'>{NAME}</span>}
                </Link>
              )
            })}
        </>}

        {error !== '' &&
        <>
            <p className='error'>{error}</p>
        </>}
      </main>
      </>
  )
}

export default Category
