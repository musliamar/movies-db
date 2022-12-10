import React from 'react'
import { ISingleAllData, ISingleVideoData } from '../../interfaces'
import { MEDIA_URL, IMDB_SINGLE_URL, BACKDROP_URL, AUTHOR_IMAGE_URL, ORIGINAL_IMAGE_URL } from '../../constants'
import IMDB from '../../imdb.png'
import HREF from '../../href.png'
import DEFAULT_IMAGE from '../../default.png'
import DEFAULT_PLACEHOLDER from '../../default-placeholder.png'
import ReactCountryFlag from 'react-country-flag'

interface Props {
  allData: ISingleAllData
}

function SingleContainer ({ allData }: Props): JSX.Element {
  const { detailsData, videosData } = allData

  const {
    title: ENG_TITLE,
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

  console.log(detailsData)

  interface Time {
    fullTime: number
  }

  interface Date {
    dateString: string
  }

  const toHoursAndMinutes = ({ fullTime }: Time): string => {
    const hours = Math.floor(fullTime / 60)
    const minutes = fullTime % 60
    const hourHours = hours > 1 ? `${hours}hrs` : `${hours}h`
    return (hours !== 0 ? `${hourHours} ${minutes}m` : `${minutes}m`)
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })

  const dateFormatter = ({ dateString }: Date): string => {
    const splitted = dateString.split('-')
    const [y, m, d] = [splitted[0], splitted[1], splitted[2]]
    return (`${m}/${d}/${y}`)
  }

  const TRAILERS = videosData?.filter((video: ISingleVideoData) => (video.official) && (video.type === 'Trailer') && (video.site === 'YouTube'))
  const FIRST_TRAILER_KEY = ((TRAILERS != null) && (TRAILERS !== undefined) && (TRAILERS.length !== 0)) && TRAILERS[0].key

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
    <span><span className='bold'>Budget: </span> {currencyFormatter.format(BUDGET)}</span>

  const detailsRevenue = (REVENUE != null && REVENUE !== 0) &&
    <span><span className='bold'>Revenue: </span> {currencyFormatter.format(REVENUE)}</span>

  const detailsEpisodes = (NUM_OF_EPISODES != null && NUM_OF_EPISODES !== 0) &&
    <span><span className='bold'>Number of episodes: </span> {NUM_OF_EPISODES}</span>

  const detailsSeasons = (NUM_OF_SEASONS != null && NUM_OF_SEASONS !== 0) &&
    <span><span className='bold'>Number of seasons: </span> {NUM_OF_SEASONS}</span>

  const detailsOrigLanguage = (LANGUAGE != null) &&
    <span><span className='bold'>Original language: </span> {LANGUAGE}</span>

  const detailsLanguages = (LANGUAGES != null) &&
    <span><span className='bold'>Languages: </span>
    {LANGUAGES.map((language, index) => `${language}${index === LANGUAGES.length - 1 ? '' : ', '}`)}</span>

  const detailsSpokenLanguages = (SPOKEN_LANGUAGES != null) &&
    <span><span className='bold'>Spoken languages: </span>
    {SPOKEN_LANGUAGES.map((language, index) => `${language.english_name as string}${index === SPOKEN_LANGUAGES.length - 1 ? '' : ', '}`)}</span>

  const detailsStatus = (STATUS != null) &&
    <span><span className='bold'>Status: </span> {STATUS}</span>

  const detailsLastAirDate = (LAST_AIR_DATE != null) &&
    <span><span className='bold'>Last air date: </span> {dateFormatter({ dateString: LAST_AIR_DATE })}</span>

  const detailsOriginalTitle = (ORIGINAL_TITLE != null)
    ? <span><span className='bold'>Original title:</span> {ORIGINAL_TITLE}</span>
    : (ORIGINAL_NAME != null) && <span><span className='bold'>Original name: </span> {ORIGINAL_NAME}</span>

  const EPISODE_RUNTIME = (typeof EPISODES_RUNTIME_TO_FIX === 'object' && (EPISODES_RUNTIME_TO_FIX.length !== 0))
    ? EPISODES_RUNTIME_TO_FIX[0]
    : EPISODES_RUNTIME_TO_FIX

  const entryTitle = (ENG_TITLE != null)
    ? <h1 className='entry-name'>{ENG_TITLE}</h1>
    : (NAME != null) && <h1 className='entry-name'>{NAME}</h1>

  const entryRuntime = ((RUNTIME != null) && (RUNTIME !== 0))
    ? <span>{toHoursAndMinutes({ fullTime: RUNTIME })}</span>
    : ((EPISODE_RUNTIME != null) && (EPISODE_RUNTIME !== 0) && ((EPISODE_RUNTIME as number[]).length !== 0)) &&
      <span>~ {toHoursAndMinutes({ fullTime: EPISODE_RUNTIME as number })}</span>

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

  const detailsOrigCountry = (ORIG_COUNTRY != null) && <span><span className='bold'>Country of origin: </span>
    {ORIG_COUNTRY.map((country) => {
      const flag = <ReactCountryFlag
                    countryCode={country}
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                      paddingRight: '5px'
                    } }
                      title={country} />
      return (flag)
    })}</span>

  const detailsCountries = (COUNTRIES != null) && <span><span className='bold'>Countries: </span>
    {COUNTRIES.map((country) => {
      const flag = <ReactCountryFlag
                    countryCode={country.iso_3166_1 as string}
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                      paddingRight: '5px'
                    } }
                      title={country.name} />
      return (flag)
    })}</span>

  const detailsAuthors = (AUTHORS != null) &&
    <><h2>Authors</h2>
    <div className='group'>
      {AUTHORS.map((author) => {
        const { profile_path: authorProfilePath, name: authorName } = author
        const authorPoster = authorProfilePath as string
        const authorPosterPath = (authorPoster !== null) ? `${AUTHOR_IMAGE_URL}/${authorPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={authorName} className='single-in-group'>
            <img width='100' loading='lazy' src={authorPosterPath} />
            <span>{authorName}</span>
          </div>)
      })}
    </div></>

  const collectionPoster = COLLECTION?.backdrop_path as string
  const collectionPosterPath = (collectionPoster !== null) ? `${BACKDROP_URL}/${collectionPoster}` : DEFAULT_PLACEHOLDER
  const detailsSeasonsOrCollections = (COLLECTION != null)
    ? <><h2>Part of collection</h2>
        <div className='group'>
          <div key={COLLECTION.name} className='single-in-group'>
            <img width='100' loading='lazy' src={collectionPosterPath} />
            <span>{COLLECTION.name}</span>
          </div>
        </div></>
    : (SEASONS != null) &&
      <><h2>Seasons</h2>
      <div className='group'>
      {SEASONS.map((season) => {
        const { poster_path: seasonPath, name: seasonName } = season
        const seasonPoster = seasonPath as string
        const seasonPosterPath = (seasonPoster !== null) ? `${BACKDROP_URL}/${seasonPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={seasonName} className='single-in-group'>
            <img width='100' loading='lazy' src={seasonPosterPath} />
            <span>{seasonName}</span>
          </div>)
      })}</div></>

  const detailsCompanies = (COMPANIES != null) &&
    <><h2>Companies</h2>
    <div className='group'>
      {COMPANIES.map((company) => {
        const { id: companyId, name: companyName, logo_path: companyLogo } = company
        const companyPoster = companyLogo as string
        const companyPosterPath = (companyPoster !== null) ? `${ORIGINAL_IMAGE_URL}/${companyPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={companyId} className='single-in-group'>
            <img width='100' loading='lazy' src={companyPosterPath} />
            <span>{companyName}</span>
          </div>)
      })}
    </div></>

  const detailsNetworks = (NETWORKS != null) &&
    <><h2>Networks</h2>
    <div className='group'>
      {NETWORKS.map((network) => {
        const { name: networkName, logo_path: networkLogo } = network
        const networkPoster = networkLogo as string
        const networkPosterPath = (networkPoster !== null) ? `${ORIGINAL_IMAGE_URL}/${networkPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={networkName} className='single-in-group'>
            <img width='100' loading='lazy' src={networkPosterPath} />
            <span>{networkName}</span>
          </div>)
      })}
    </div></>

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
