import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTopRated } from '../../queries'
import { IEntriesData, ISingleEntryData } from '../../interfaces'
import { useStore, useDispatch } from '../../context'
import { SET_CURRENT_DATA, SET_ERROR } from '../../constants'
import './Main.css'

function MainSection (): JSX.Element {
  const { category } = useParams()
  const { currentData, error } = useStore()
  const dispatch = useDispatch()

  useEffect(() => {
    const toFetch: string = category as string
    fetchTopRated({ toFetch }).then((data: IEntriesData) => {
      const { results } = data
      dispatch({
        type: SET_CURRENT_DATA,
        payload: results.slice(0, 10)
      })
    })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          payload: 'Error with retrieving data.'
        })
      })
  }, [category])

  return (
      <main className='entries-container'>
        {(currentData.length !== 0 && error === '') &&
        <>
            {currentData.map((single): ISingleEntryData => {
              const { poster_path: POSTER_PATH, original_title: ORIGINAL_TITLE, name: NAME } = single
              return (<div key={single.id} className='entry-card'>
            <img className='entry-poster' src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${POSTER_PATH as string}`} />
              {(ORIGINAL_TITLE != null) && <span className='entry-name'>{ORIGINAL_TITLE}</span>}
              {(NAME != null) && <span className='entry-name'>{NAME}</span>}
          </div>)
            })}
        </>}

        {error !== '' &&
        <>
            <p>{error}</p>
        </>}
      </main>
  )
}

export default MainSection
