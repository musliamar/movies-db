import React, { useState, useEffect } from 'react'
import { useDispatch } from '../../lib/context'
import { ISingleAllData, ISingleVideoData } from '../../lib/interfaces'
import { IMDB_SINGLE_URL, MEDIA_URL, YOUTUBE_EMBED, SET_PROGRESS_VALUE } from '../../lib/constants'
import IMDB from '../../media/imdb.png'
import HREF from '../../media/href.png'
import DEFAULT_IMAGE from '../../media/default.png'
import Placeholder from '../Placeholder'

interface Props {
  allData: ISingleAllData
}

interface Time {
  fullTime: number
}

const toHoursAndMinutes = ({ fullTime }: Time): string => {
  const hours = Math.floor(fullTime / 60)
  const minutes = fullTime % 60
  const hourHours = hours > 1 ? `${hours}hrs` : `${hours}h`
  const minutesMinutes = `${minutes}m`
  return (hours > 0 ? `${hourHours} ${minutes > 0 ? minutesMinutes : ''}` : `${minutes > 0 ? minutesMinutes : ''}`)
}

function Headline ({ allData }: Props): JSX.Element {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const dispatch = useDispatch()
  const { detailsData, videosData } = allData
  const {
    poster_path: POSTER,
    title: ENG_TITLE,
    name: NAME,
    vote_count: VOTES,
    imdb_id: IMDB_ID,
    runtime: RUNTIME,
    first_air_date: AIR_DATE,
    vote_average: VOTE_AVERAGE,
    genres: GENRES_TO_FIX,
    episode_run_time: EPISODES_RUNTIME_TO_FIX,
    homepage: HOMEPAGE,
    release_date: DATE
  } = detailsData

  const YEAR = (DATE != null) ? DATE.split('-')[0] : AIR_DATE?.split('-')[0]
  const AVERAGE_VOTE = VOTE_AVERAGE?.toFixed(1)
  const GENRES_ARRAY = (typeof GENRES_TO_FIX === 'object') ? (GENRES_TO_FIX as any[]).map((genre) => genre.name) : null
  const GENRES = (GENRES_ARRAY != null) ? GENRES_ARRAY.join(', ') : null
  const entryYear = (YEAR != null) && <span>({YEAR})</span>
  const entryGenres = (GENRES_TO_FIX != null) && <span>{GENRES}</span>
  const entryNumberOfVotes = ((VOTES !== 0) && (VOTES !== undefined)) && <span>{VOTES} {VOTES > 1 ? 'votes' : 'vote'} </span>
  const entryAverageVote = (AVERAGE_VOTE !== '0.0') && <span className='average-vote-label'>{AVERAGE_VOTE}</span>
  const TRAILERS = videosData?.filter((video: ISingleVideoData) => (video.official) && (video.type === 'Trailer') && (video.site === 'YouTube'))
  const FIRST_TRAILER_KEY = ((TRAILERS != null) && (TRAILERS !== undefined) && (TRAILERS.length > 0)) && TRAILERS[0].key
  const image = POSTER as string
  const singlePosterPath = (image !== null) ? `${MEDIA_URL}/${image}` : DEFAULT_IMAGE

  const EPISODE_RUNTIME = (typeof EPISODES_RUNTIME_TO_FIX === 'object' && (EPISODES_RUNTIME_TO_FIX.length > 0))
    ? EPISODES_RUNTIME_TO_FIX[0]
    : EPISODES_RUNTIME_TO_FIX

  const entryRuntime = ((RUNTIME != null) && (RUNTIME > 0))
    ? <span>{toHoursAndMinutes({ fullTime: RUNTIME })}</span>
    : ((EPISODE_RUNTIME != null) && (EPISODE_RUNTIME > 0) && ((EPISODE_RUNTIME as number[]).length !== 0)) &&
      <span>~ {toHoursAndMinutes({ fullTime: EPISODE_RUNTIME as number })}</span>

  const imdbLink = (IMDB_ID != null) &&
    <a href={`${IMDB_SINGLE_URL}/${IMDB_ID}`} target="_blank" rel="noreferrer">
      <img className='imdb-icon' src={IMDB} alt='Visit IMDB profile' />
    </a>

  const homeLink = ((HOMEPAGE != null) && (HOMEPAGE !== '')) &&
    <a href={HOMEPAGE} target="_blank" rel="noreferrer">
      <img className='href-icon' src={HREF} alt='Visit homepage' />
    </a>

  const entryTitle = (ENG_TITLE != null)
    ? <div className='entry-name'>
        <h1>{ENG_TITLE} {entryYear}</h1>
        <div className='votes'>
          {entryAverageVote}
          {entryNumberOfVotes}
        </div>
      </div>
    : (NAME != null) &&
      <div className='entry-name'>
        <h1>{NAME} {entryYear}</h1>
        <div className='votes'>
          {entryAverageVote}
          {entryNumberOfVotes}
        </div>
      </div>

  const TRAILER_EMBED = (FIRST_TRAILER_KEY !== false) &&
    <div className='youtube-embed'>
      <iframe
      onLoad={() => setIsImageLoaded(true)}
      loading='lazy'
      src={`${YOUTUBE_EMBED}/${FIRST_TRAILER_KEY}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
    </div>

  const entryPoster = (FIRST_TRAILER_KEY !== false)
    ? TRAILER_EMBED
    : <img
        onLoad={() => setIsImageLoaded(true)}
        className={isImageLoaded ? 'entry-poster' : 'entry-poster transparent'}
        loading='lazy'
        alt='Poster image'
        src={singlePosterPath} />

  useEffect(() => {
    isImageLoaded && dispatch({ type: SET_PROGRESS_VALUE, payload: 100 })
  }, [isImageLoaded])

  return (
    <><div className='entry-poster-wrapper'>
      {entryPoster}
      {!isImageLoaded && <Placeholder />}
    </div>
    <div className='headline'>
          <div className='title-and-votes'>
            {entryTitle}
            {entryGenres}
          </div>
          <div className='links'>
            {entryRuntime}
            {imdbLink}
            {homeLink}
          </div>
    </div></>
  )
}

export default Headline
