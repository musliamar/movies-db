import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingle, fetchTrailer } from '../../queries'
import { ISingleEntryData, IVideosData, ISingleAllData } from '../../interfaces'
import SingleContainer from './SingleContainer'
import './Single.css'

function Single (): JSX.Element {
  const initialSingleData: ISingleAllData = { detailsData: {} }
  const [singleData, setSingleData] = useState(initialSingleData)
  const [error, setError] = useState('')
  const { category, singleId } = useParams()
  const navigate = useNavigate()
  let categoryToFetch: string = category as string
  const idToFetch: string = singleId as string
  if (category === undefined) categoryToFetch = 'movie'

  useEffect(() => {
    fetchSingle({ categoryToFetch, idToFetch })
      .then((detailsData: ISingleEntryData) => {
        fetchTrailer({ categoryToFetch, idToFetch })
          .then(({ results: videosData }: IVideosData) => {
            setSingleData({ detailsData, videosData })
          }).catch(() => {
            setSingleData({ detailsData })
          })
      }).catch(() => {
        setError('There is nothing on this path.')
      })
  }, [category])

  return (
    <>
      <button className='go-back' onClick={() => navigate(-1)}>Go back</button>
      <main className='single-entry-container'>
        {((error === '') && (singleData !== null)) && <SingleContainer allData={singleData} />}
        {error !== '' && <p>{error}</p>}
      </main>
    </>
  )
}

export default Single
