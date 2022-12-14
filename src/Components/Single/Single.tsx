import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingle, fetchTrailer } from '../../lib/queries'
import { ISingleEntryData, IVideosData, ISingleAllData } from '../../lib/interfaces'
import Spinner from '../Spinner'
import './Single.css'

const SingleContainer = lazy(async () => await import('./SingleContainer'))

function Single (): JSX.Element {
  const initialSingleData: ISingleAllData = { detailsData: {} }
  const [singleData, setSingleData] = useState(initialSingleData)
  const [loading, setLoading] = useState({ message: '', status: '' })
  const { status, message } = loading
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
        setLoading({ message: '', status: 'success' })
      }).catch(() => {
        setLoading({ message: 'There is nothing on this path.', status: 'error' })
      })
  }, [])

  return (
    <>
      <button className='go-back' onClick={() => navigate(-1)}>Go back</button>
      <main className='single-entry-container'>
        {((status === 'success') && (singleData !== null)) &&
          <Suspense fallback={<Spinner />}><SingleContainer allData={singleData} /></Suspense>
        }
        {status === 'error' && <p className='error'>{message}</p>}
      </main>
    </>
  )
}

export default Single
