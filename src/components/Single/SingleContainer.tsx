import React, { lazy, Suspense, useEffect } from 'react'
import { ISingleAllData } from '../../lib/interfaces'
import Spinner from '../Spinner'
import { useDispatch } from '../../lib/context'
import { SET_PROGRESS_VALUE } from '../../lib/constants'
import './SingleContainer.css'

const LeftDetails = lazy(async () => await import('./LeftDetails'))
const RightDetails = lazy(async () => await import('./RightDetails'))
const Headline = lazy(async () => await import('./SingleHeadline'))

interface Props {
  allData: ISingleAllData
}

function SingleContainer ({ allData }: Props): JSX.Element {
  const { detailsData } = allData
  const dispatch = useDispatch()

  const {
    overview: OVERVIEW,
    tagline: TAGLINE
  } = detailsData

  const entryTagline = ((TAGLINE != null) && (TAGLINE !== '')) &&
    <div className='tagline'>
      {`"${TAGLINE}"`}
    </div>

  const entryOverview = ((OVERVIEW != null) && (OVERVIEW.length > 0)) &&
    <div className='entry-overview'>
      <h2>Overview</h2>
      {OVERVIEW}
    </div>

  useEffect(() => {
    dispatch({ type: SET_PROGRESS_VALUE, payload: 70 })
  }, [])

  return (
    <>
      <div className='entry-details'>
        <Suspense fallback={<Spinner />}>
          <Headline allData={allData} />
        </Suspense>
      </div>
      {entryTagline}
      {entryOverview}
      <div className='full-details'>
        <Suspense fallback={<Spinner />}>
          <LeftDetails detailsData={detailsData} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <RightDetails detailsData={detailsData} />
        </Suspense>
      </div>
    </>
  )
}

export default SingleContainer
