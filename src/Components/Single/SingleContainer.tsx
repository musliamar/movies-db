import React from 'react'
import { ISingleAllData, ISingleVideoData } from '../../interfaces'
import { MEDIA_URL, IMDB_SINGLE_URL, BACKDROP_URL } from '../../constants'
import IMDB from '../../imdb.png'
import HREF from '../../href.png'
import DEFAULT_IMAGE from '../../default.png'

interface Props {
  allData: ISingleAllData
}

function SingleContainer ({ allData }: Props): JSX.Element {
  const { detailsData, videosData } = allData

  console.log(detailsData)

  const {
    original_title: TITLE,
    name: NAME,
    poster_path: POSTER,
    overview: OVERVIEW,
    vote_count: VOTES,
    imdb_id: IMDB_ID,
    belongs_to_collection: COLLECTION,
    runtime: RUNTIME,
    episode_run_time: EPISODES_RUNTIME_TO_FIX,
    homepage: HOMEPAGE,
    release_date: DATE,
    revenue: REVENUE,
    created_by: AUTHORS,
    budget: BUDGET,
    production_countries: COUNTRIES,
    production_companies: COMPANIES,
    tagline: TAGLINE,
    spoken_languages: SPOKEN_LANGUAGES,
    original_language: LANGUAGE,
    languages: LANGUAGES,
    status: STATUS,
    number_of_episodes: NUM_OF_EPISODES,
    number_of_seasons: NUM_OF_SEASONS,
    original_title: ORIGINAL_TITLE,
    original_name: ORIGINAL_NAME,
    origin_country: ORIG_COUNTRY,
    in_production: IN_PRODUCTION,
    seasons: SEASONS,
    genres: GENRES_TO_FIX,
    networks: NETWORKS,
    last_air_date: LAST_AIR_DATE,
    first_air_date: AIR_DATE,
    vote_average: VOTE_AVERAGE
  } = detailsData

  const TRAILERS = videosData?.filter((video: ISingleVideoData) => (video.official) && (video.type === 'Trailer') && (video.site === 'YouTube'))
  const FIRST_TRAILER_KEY = ((TRAILERS != null) && (TRAILERS !== undefined) && (TRAILERS.length !== 0)) && TRAILERS[0].key

  const TRAILER_EMBED = (FIRST_TRAILER_KEY !== false) && <div className='youtube-embed'>
                          <iframe
                            loading='lazy'
                            src={`https://www.youtube-nocookie.com/embed/${FIRST_TRAILER_KEY}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                        </div>

  const image = POSTER as string
  const singlePosterPath = (image !== null) ? `${MEDIA_URL}/${image}` : DEFAULT_IMAGE
  const entryPoster = (FIRST_TRAILER_KEY !== false) ? TRAILER_EMBED : <img className='entry-poster' loading='lazy' src={singlePosterPath} />
  const YEAR = (DATE != null) ? DATE.split('-')[0] : AIR_DATE?.split('-')[0]
  const AVERAGE_VOTE = VOTE_AVERAGE?.toFixed(1)
  const GENRES_ARRAY = (typeof GENRES_TO_FIX === 'object') ? (GENRES_TO_FIX as any[]).map((genre) => genre.name) : null
  const GENRES = (GENRES_ARRAY != null) ? GENRES_ARRAY.join(', ') : null
  const entryYear = (YEAR != null) && <span>{YEAR}</span>
  const entryGenres = (GENRES_TO_FIX != null) && <span>{GENRES}</span>
  const entryNumberOfVotes = (VOTES !== 0) && <span>{VOTES} votes</span>
  const entryAverageVote = (AVERAGE_VOTE !== '0.0') && <span className='average-vote-label'>{AVERAGE_VOTE}</span>
  const detailsIsInProduction = (IN_PRODUCTION === true)
    ? <span className='bold'>Currently in production</span>
    : <span className='bold'>Not in production</span>

  const detailsBudget = (BUDGET != null && BUDGET !== 0) &&
                        <span><span className='bold'>Budget: </span> ${BUDGET}</span>

  const detailsRevenue = (REVENUE != null && REVENUE !== 0) &&
                        <span><span className='bold'>Revenue: </span> ${REVENUE}</span>

  const detailsEpisodes = (NUM_OF_EPISODES != null && NUM_OF_EPISODES !== 0) &&
                          <span><span className='bold'>Number of episodes: </span> {NUM_OF_EPISODES}</span>

  const detailsSeasons = (NUM_OF_SEASONS != null && NUM_OF_SEASONS !== 0) &&
                          <span><span className='bold'>Number of seasons: </span> {NUM_OF_SEASONS}</span>

  const detailsOrigLanguage = (LANGUAGE != null) &&
                          <span><span className='bold'>Original language: </span> {LANGUAGE}</span>

  const detailsLanguages = (LANGUAGES != null) &&
                          <span><span className='bold'>Languages: </span>
                          {LANGUAGES.map((language) => `${language}, `)}</span>

  const detailsSpokenLanguages = (SPOKEN_LANGUAGES != null) &&
                          <span><span className='bold'>Spoken languages: </span>
                          {SPOKEN_LANGUAGES.map((language) => `${language.english_name as string}, `)}</span>

  const detailsOrigCountry = (ORIG_COUNTRY != null) &&
                          <span><span className='bold'>Country of origin: </span> {ORIG_COUNTRY}</span>

  const detailsCountries = (COUNTRIES != null) && <span><span className='bold'>Countries: </span>
                            {COUNTRIES.map((country) => `${country.name as string}, `)}</span>

  const detailsStatus = (STATUS != null) &&
                          <span><span className='bold'>Status: </span> {STATUS}</span>

  const detailsLastAirDate = (LAST_AIR_DATE != null) &&
                            <span><span className='bold'>Last air date: </span> {LAST_AIR_DATE}</span>

  const detailsOriginalTitle = (ORIGINAL_TITLE != null)
    ? <span><span className='bold'>Original title:</span> {ORIGINAL_TITLE}</span>
    : (ORIGINAL_NAME != null) && <span><span className='bold'>Original name: </span> {ORIGINAL_NAME}</span>

  const detailsAuthors = (AUTHORS != null) &&
                          <><h2>Authors</h2>
                          <div className='group'>
                          {AUTHORS.map((author) => (
                            <div key={author.name} className='single-in-group'>
                              <img width='100' loading='lazy' src={`https://image.tmdb.org/t/p/w138_and_h175_face//${author.profile_path as string}`} />
                              <span>{author.name}</span>
                            </div>))}
                          </div></>

  const detailsSeasonsOrCollections = (COLLECTION != null)
    ? <><h2>Part of collection</h2>
                                          <div className='group'>
                                          <div key={COLLECTION.name} className='single-in-group'>
                                          <img width='100' loading='lazy' src={`${BACKDROP_URL}/${COLLECTION.backdrop_path}`} />
                                          <span>{COLLECTION.name}</span>
                                        </div></div></>
    : (SEASONS != null) && <><h2>Seasons</h2>
    <div className='group'>
      {SEASONS.map((season) => (

                                        <div key={season.name} className='single-in-group'>
                                          <img width='100' loading='lazy' src={`https://image.tmdb.org/t/p/w220_and_h330_face/${season.poster_path as string}`} />
                                          <span>{season.name}</span>
                                        </div>))}</div></>

  const detailsCompanies = (COMPANIES != null) &&
                            <><h2>Companies</h2>
                              <div className='group'>
                                {COMPANIES.map((company) =>
                                  <div key={company.id} className='single-in-group'>
                                    <img width='100' loading='lazy' src={`https://image.tmdb.org/t/p/original/${company.logo_path as string}`} />
                                    {company.name}
                                  </div>)}
                              </div></>

  const detailsNetworks = (NETWORKS != null) &&
                          <><h2>Networks</h2>
                          <div className='group'>
                            {NETWORKS.map((network) => (
                              <div key={network.name} className='single-in-group'>
                                <img width='100' loading='lazy' src={`https://image.tmdb.org/t/p/original/${network.logo_path as string}`} />
                                {network.name}
                              </div>))}
                          </div></>

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
        <h2>Overview</h2>
        {OVERVIEW}
      </div>
      <div className='full-details'>
      <div className='left-details'>
      <h2>Details</h2>
          {detailsOriginalTitle}
          {detailsBudget}
          {detailsRevenue}
          {detailsEpisodes}
          {detailsSeasons}
          {detailsOrigLanguage}
          {detailsLanguages}
          {detailsSpokenLanguages}
          {detailsOrigCountry}
          {detailsCountries}
          {detailsStatus}
          {detailsIsInProduction}
          {detailsLastAirDate}
        </div>
        <div className='right-details'>
          {detailsAuthors}
          {detailsSeasonsOrCollections}
          {detailsCompanies}
          {detailsNetworks}
        </div>
      </div>
    </>
  )
}

export default SingleContainer
