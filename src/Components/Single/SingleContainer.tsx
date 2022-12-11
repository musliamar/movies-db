import React from 'react'
import { ISingleAllData, ISingleVideoData } from '../../lib/interfaces'
import { MEDIA_URL } from '../../lib/constants'
import DEFAULT_IMAGE from '../../media/default.png'
import Headline from './SingleHeadline'
import LeftDetails from './LeftDetails'
import RightDetails from './RightDetails'

interface Props {
  allData: ISingleAllData
}

function SingleContainer ({ allData }: Props): JSX.Element {
  const { detailsData, videosData } = allData

  const {
    poster_path: POSTER,
    overview: OVERVIEW,
    tagline: TAGLINE
  } = detailsData

  const TRAILERS = videosData?.filter((video: ISingleVideoData) => (video.official) && (video.type === 'Trailer') && (video.site === 'YouTube'))
  const FIRST_TRAILER_KEY = ((TRAILERS != null) && (TRAILERS !== undefined) && (TRAILERS.length > 0)) && TRAILERS[0].key

  const entryTagline = ((TAGLINE != null) && (TAGLINE !== '')) &&
    <div className='tagline'>
      {`"${TAGLINE}"`}
    </div>

  const entryOverview = ((OVERVIEW != null) && (OVERVIEW.length > 0)) &&
    <div className='entry-overview'>
      <h2>Overview</h2>
      {OVERVIEW}
    </div>

  const TRAILER_EMBED = (FIRST_TRAILER_KEY !== false) &&
    <div className='youtube-embed'>
      <iframe
      loading='lazy'
      src={`https://www.youtube-nocookie.com/embed/${FIRST_TRAILER_KEY}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
    </div>

  const image = POSTER as string
  const singlePosterPath = (image !== null) ? `${MEDIA_URL}/${image}` : DEFAULT_IMAGE
  const entryPoster = (FIRST_TRAILER_KEY !== false) ? TRAILER_EMBED : <img className='entry-poster' loading='lazy' alt='Poster image' src={singlePosterPath} />

  return (
    <>
      <div className='entry-details'>
        {entryPoster}
        <Headline detailsData={detailsData} />
      </div>
      {entryTagline}
      {entryOverview}
      <div className='full-details'>
        <LeftDetails detailsData={detailsData} />
        <RightDetails detailsData={detailsData} />
      </div>
    </>
  )
}

export default SingleContainer
