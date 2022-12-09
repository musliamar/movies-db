import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingle } from '../queries'
import { ISingleEntryData } from '../interfaces'
import { useStore, useDispatch } from '../context'
import { SET_CURRENT_SINGLE, SET_ERROR } from '../constants'

function Single (): JSX.Element {
  const { category, singleId } = useParams()
  const { currentSingle, error } = useStore()
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
    <button onClick={() => navigate(-1)}>Go back</button>
    <main className='single-entry-container'>
        {error === '' &&
              <div className='entry-details'>
                  <img className='entry-poster' src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentSingle.poster_path as string}`} />
                  {(currentSingle.original_title != null) && <span className='entry-name'>{currentSingle.original_title}</span>}
                  {(currentSingle.name != null) && <span className='entry-name'>{currentSingle.name}</span>}
              </div>
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
