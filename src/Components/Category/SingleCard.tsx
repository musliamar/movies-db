import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ISingleEntryData } from '../../lib/interfaces'
import { MEDIA_URL } from '../../lib/constants'
import DEFAULT_IMAGE from '../../media/default.png'

interface Props {
  category: string
  data: ISingleEntryData
}

function SingleCard ({ category, data }: Props): JSX.Element {
  const [hover, setHover] = useState(0)

  const {
    id,
    overview: OVERVIEW,
    vote_average: AVERAGE_VOTE,
    vote_count: NUMBER_OF_VOTES,
    poster_path: POSTER_PATH,
    original_title: ORIGINAL_TITLE,
    name: NAME
  } = data

  const SHORT_OVERVIEW = OVERVIEW?.substring(0, 150)
  const singleId = id as number
  const posterAsString = POSTER_PATH as string
  const singlePosterPath = (posterAsString !== null) ? `${MEDIA_URL}/${posterAsString}` : DEFAULT_IMAGE
  const singleOverview = `${SHORT_OVERVIEW as string}...`

  const singleTitle = (ORIGINAL_TITLE != null)
    ? <span className='entry-name'>{ORIGINAL_TITLE}</span>
    : (NAME != null) && <span className='entry-name'>{NAME}</span>

  const entryNumberOfVotes = (NUMBER_OF_VOTES !== 0) &&
    <div className='number-of-votes'>
      {NUMBER_OF_VOTES === 1 ? `${NUMBER_OF_VOTES} vote` : `${NUMBER_OF_VOTES as number} votes`}
    </div>

  const entryAverageVote = (AVERAGE_VOTE !== 0.0) &&
    <div className='average-vote'>
      <span className='average-vote-text'>avg. vote</span>
      <span className='average-vote-label'>{AVERAGE_VOTE}</span>
    </div>

  return (
      <Link
        to={`/${category}/${singleId}`}
        onMouseEnter={() => setHover(singleId)}
        onMouseLeave={() => setHover(0)}
        key={id}
        className='entry-card'>
        <div className='poster-wrapper'>
        <img
            className={hover === id ? 'entry-poster opacity' : 'entry-poster'}
            src={singlePosterPath}
            alt='Poster image'
            loading='lazy'
          />
          {hover === id &&
            <>
              {entryAverageVote}
              {entryNumberOfVotes}
              <div className='overview'>
                {singleOverview}
              </div>
            </>}
        </div>
        {singleTitle}
      </Link>)
}

export default SingleCard
