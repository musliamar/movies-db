import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingle } from '../../queries'
import { ISingleEntryData } from '../../interfaces'
import SingleContainer from './SingleContainer'
import './Single.css'

function Single (): JSX.Element {
  const [singleData, setSingleData] = useState({})
  const [error, setError] = useState('')
  const { category, singleId } = useParams()
  const navigate = useNavigate()
  let categoryToFetch: string = category as string
  const idToFetch: string = singleId as string
  if (category === undefined) categoryToFetch = 'movie'

  useEffect(() => {
    fetchSingle({ categoryToFetch, idToFetch })
      .then((data: ISingleEntryData) => {
        setSingleData(data)
      }).catch(() => {
        setError('There is nothing on this path.')
      })
  }, [category])

  return (
    <>
      <button className='go-back' onClick={() => navigate(-1)}>Go back</button>
      <main className='single-entry-container'>
        {((error === '') && (singleData !== null)) && <SingleContainer data={ singleData } />}
        {error !== '' && <p>{error}</p>}
      </main>
    </>
  )
}

export default Single
