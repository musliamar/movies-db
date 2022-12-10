import React from 'react'
import { ISingleAllData, ISingleVideoData } from '../../interfaces'
import { MEDIA_URL, IMDB_SINGLE_URL } from '../../constants'
import IMDB from '../../imdb.png'
import HREF from '../../href.png'
import DEFAULT_IMAGE from '../../default.png'

interface Props {
  allData: ISingleAllData
}

function SingleContainer ({ allData }: Props): JSX.Element {
  const { detailsData, videosData } = allData

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
  } = detailsData

  const TRAILERS = videosData?.filter((video: ISingleVideoData) => (video.official) && (video.type === 'Trailer') && (video.site === 'YouTube'))
  const FIRST_TRAILER_KEY = ((TRAILERS != null) && (TRAILERS !== undefined) && (TRAILERS.length !== 0)) && TRAILERS[0].key
  const TRAILER_EMBED = (FIRST_TRAILER_KEY !== false) && <div className='youtube-embed'>
                          <iframe
                            width='800'
                            height='400'
                            src={`https://www.youtube-nocookie.com/embed/${FIRST_TRAILER_KEY as string}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                        </div>

  const image = POSTER as string
  const singlePosterPath = (image !== null) ? `${MEDIA_URL}/${image}` : DEFAULT_IMAGE
  const entryPoster = (FIRST_TRAILER_KEY !== false) ? TRAILER_EMBED : <img className='entry-poster' src={singlePosterPath} />
  const YEAR = (DATE != null) ? DATE.split('-')[0] : AIR_DATE?.split('-')[0]
  const AVERAGE_VOTE = VOTE_AVERAGE?.toFixed(1)
  const GENRES_ARRAY = (typeof GENRES_TO_FIX === 'object') ? (GENRES_TO_FIX as any[]).map((genre) => genre.name) : null
  const GENRES = (GENRES_ARRAY != null) ? GENRES_ARRAY.join(', ') : null
  const entryYear = (YEAR != null) && <span>{YEAR}</span>
  const entryGenres = (GENRES_TO_FIX != null) && <span>{GENRES}</span>
  const entryNumberOfVotes = (VOTES !== 0) && <span>{VOTES} votes</span>
  const entryAverageVote = (AVERAGE_VOTE !== '0.0') && <span className='average-vote-label'>{AVERAGE_VOTE}</span>

  const EPISODE_RUNTIME = (typeof EPISODES_RUNTIME_TO_FIX === 'object' && (EPISODES_RUNTIME_TO_FIX.length !== 0))
    ? `~ ${EPISODES_RUNTIME_TO_FIX[0]}`
    : EPISODES_RUNTIME_TO_FIX

  const entryTitle = (TITLE != null)
    ? <h1 className='entry-name'>{TITLE}</h1>
    : (NAME != null) &&
      <h1 className='entry-name'>{NAME}</h1>

  const entryRuntime = ((RUNTIME != null) && (RUNTIME !== 0))
    ? <span>{RUNTIME} min</span>
    : ((EPISODE_RUNTIME != null) && (EPISODE_RUNTIME.length !== 0) && (EPISODE_RUNTIME !== '0')) &&
      <span>{EPISODE_RUNTIME} min</span>

  const imdbLink = (IMDB_ID != null) &&
                    <a href={`${IMDB_SINGLE_URL}/${IMDB_ID}`} target="_blank" rel="noreferrer">
                      <img className='imdb-icon' src={IMDB} />
                    </a>

  const homeLink = ((HOMEPAGE != null) && (HOMEPAGE !== '')) &&
                    <a href={HOMEPAGE} target="_blank" rel="noreferrer">
                      <img className='href-icon' src={HREF} />
                    </a>

  const entryTagline = ((TAGLINE != null) && (TAGLINE !== '')) &&
                        <div className='tagline'>
                          {`"${TAGLINE}"`}
                        </div>

  return (
    <>
      <div className='entry-details'>
        {entryPoster}
        <div className='headline'>
          <div className='title-and-votes'>
            {entryTitle}
            {entryYear}
            {entryGenres}
          </div>
          <div className='links'>
            <div className='votes'>
              {entryAverageVote}
              {entryNumberOfVotes}
            </div>
            {entryRuntime}
            {imdbLink}
            {homeLink}
          </div>
        </div>
      </div>
      {entryTagline}
      <div className='entry-overview'>
        {OVERVIEW}
      </div>
    </>
  )
}

export default SingleContainer
