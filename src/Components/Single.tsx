import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingle } from '../queries'
import { ISingleEntryData } from '../interfaces'
import { useStore, useDispatch } from '../context'
import { SET_CURRENT_SINGLE, SET_ERROR } from '../constants'
import './Single.css'
import IMDB from '../imdb.png'
import HREF from '../href.png'

function Single (): JSX.Element {
  const { category, singleId } = useParams()
  const { currentSingle, error } = useStore()
  console.log(currentSingle)
  const {
    original_title: TITLE,
    name: NAME,
    poster_path: POSTER,
    overview: OVERVIEW,
    vote_count: VOTES,
    imdb_id: IMDB_ID,
    runtime: RUNTIME,
    episode_run_time: EPISODES_RUNTIME_TO_FIX,
    homepage: HOMEPAGE,
    release_date: DATE,
    tagline: TAGLINE,
    genres: GENRES_TO_FIX,
    first_air_date: AIR_DATE,
    vote_average: VOTE_AVERAGE
  } = currentSingle

  const YEAR = (DATE != null) ? DATE.split('-')[0] : AIR_DATE?.split('-')[0]
  const AVERAGE_VOTE = VOTE_AVERAGE?.toFixed(1)
  const EPISODE_RUNTIME = (typeof EPISODES_RUNTIME_TO_FIX === 'object') ? EPISODES_RUNTIME_TO_FIX[0] : EPISODES_RUNTIME_TO_FIX
  const GENRES_ARRAY = (GENRES_TO_FIX as any[]).map((genre) => genre.name)
  const GENRES = GENRES_ARRAY.join(', ')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let categoryToFetch: string = category as string
  const idToFetch: string = singleId as string
  if (category === undefined) categoryToFetch = 'movie'

  useEffect(() => {
    fetchSingle({ categoryToFetch, idToFetch }).then((data: ISingleEntryData) => {
      dispatch({
        type: SET_CURRENT_SINGLE,
        payload: data
      })
    })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          payload: 'There is nothing on this path.'
        })
      })
  }, [category])

  return (
    <>
    <button className='go-back' onClick={() => navigate(-1)}>Go back</button>
    <main className='single-entry-container'>
        {error === '' &&
        <>
              <div className='entry-details'>
                  <img className='entry-poster' src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${POSTER as string}`} />
                  <div className='headline'>
                  <div className='title-and-votes'>
                    {(TITLE != null) && <h1 className='entry-name'>{TITLE}</h1>}
                    {(NAME != null) && <h1 className='entry-name'>{NAME}</h1>}
                    <span className='average-vote-label'>{AVERAGE_VOTE}</span>
                    <span>{VOTES} votes</span>
                    {(YEAR != null) && <span>{YEAR}</span>}
                    {(GENRES_TO_FIX != null) && <span>{GENRES}</span>}
                  </div>
                  <div className='links'>
                    {(RUNTIME != null) && <span>{RUNTIME} min</span>}
                    {(EPISODE_RUNTIME != null) && <span>{EPISODE_RUNTIME} min</span>}
                    {(IMDB_ID != null) && <a href={`http://www.imdb.com/title/${IMDB_ID}` } target="_blank" rel="noreferrer">
                      <img className='imdb-icon' src={IMDB} />
                    </a>}
                    {(HOMEPAGE != null) && <a href={HOMEPAGE} target="_blank" rel="noreferrer">
                      <img className='href-icon' src={HREF} />
                    </a>}
                  </div>
                  </div>
              </div>
              {(TAGLINE != null) &&
              <div className='tagline'>
                {`"${TAGLINE}"`}
                </div>}
              <div className='entry-overview'>
                {OVERVIEW}
              </div>
              </>
        }

        {error !== '' &&
        <>
            <p>{error}</p>
        </>}
    </main>
    </>
  )
}

export default Single
