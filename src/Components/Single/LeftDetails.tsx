import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ISingleEntryData } from '../../lib/interfaces'

interface Props {
  detailsData: ISingleEntryData
}

function Left ({ detailsData }: Props): JSX.Element {
  const {
    spoken_languages: SPOKEN_LANGUAGES,
    original_language: LANGUAGE,
    languages: LANGUAGES,
    status: STATUS,
    number_of_episodes: NUM_OF_EPISODES,
    number_of_seasons: NUM_OF_SEASONS,
    original_title: ORIGINAL_TITLE,
    original_name: ORIGINAL_NAME,
    origin_country: ORIG_COUNTRY,
    budget: BUDGET,
    in_production: IN_PRODUCTION,
    production_countries: COUNTRIES,
    revenue: REVENUE,
    last_air_date: LAST_AIR_DATE
  } = detailsData

  interface Date {
    dateString: string
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

  const detailsIsInProduction = (IN_PRODUCTION === true)
    ? 'Currently in production'
    : 'Not in production'

  const detailsBudget = (BUDGET != null && BUDGET > 0) &&
    <span className='single-left-detail'><span className='bold'>Budget: </span> {currencyFormatter.format(BUDGET)}</span>

  const detailsRevenue = (REVENUE != null && REVENUE > 0) &&
    <span className='single-left-detail'><span className='bold'>Revenue: </span> {currencyFormatter.format(REVENUE)}</span>

  const detailsEpisodes = (NUM_OF_EPISODES != null && NUM_OF_EPISODES > 0) &&
    <span className='single-left-detail'><span className='bold'>Number of episodes: </span> {NUM_OF_EPISODES}</span>

  const detailsSeasons = (NUM_OF_SEASONS != null && NUM_OF_SEASONS > 0) &&
    <span className='single-left-detail'><span className='bold'>Number of seasons: </span> {NUM_OF_SEASONS}</span>

  const detailsOrigLanguage = ((LANGUAGE != null) && (LANGUAGE.length > 0)) &&
    <span className='single-left-detail'><span className='bold'>Original language: </span> {LANGUAGE}</span>

  const detailsLanguages = ((LANGUAGES != null) && (LANGUAGES.length > 0)) &&
    <span className='single-left-detail'><span className='bold'>{LANGUAGES.length > 1 ? 'Languages' : 'Language'}: </span>
    {LANGUAGES.map((language, index) => `${language}${index === LANGUAGES.length - 1 ? '' : ', '}`)}</span>

  const detailsSpokenLanguages = ((SPOKEN_LANGUAGES != null) && (SPOKEN_LANGUAGES.length > 0)) &&
    <span className='single-left-detail'><span className='bold'>{SPOKEN_LANGUAGES.length > 1 ? 'Spoken languages' : 'Spoken language'}: </span>
    {SPOKEN_LANGUAGES.map((language, index) => `${language.english_name as string}${index === SPOKEN_LANGUAGES.length - 1 ? '' : ', '}`)}</span>

  const detailsStatus = (STATUS != null) &&
    <span className='single-left-detail'><span className='bold'>Status: </span> {STATUS} - {detailsIsInProduction}</span>

  const detailsLastAirDate = (LAST_AIR_DATE != null) &&
    <span className='single-left-detail'><span className='bold'>Last air date: </span> {dateFormatter({ dateString: LAST_AIR_DATE })}</span>

  const detailsOriginalTitle = (ORIGINAL_TITLE != null)
    ? <span className='single-left-detail'><span className='bold'>Original title:</span> {ORIGINAL_TITLE}</span>
    : (ORIGINAL_NAME != null) && <span className='single-left-detail'><span className='bold'>Original name: </span> {ORIGINAL_NAME}</span>

  const detailsOrigCountry = ((ORIG_COUNTRY != null) && (ORIG_COUNTRY.length > 0)) && <span className='single-left-detail'><span className='bold'>{ORIG_COUNTRY.length > 1 ? 'Countries of origin' : 'Country of origin'}: </span>
    {ORIG_COUNTRY.map((country) => {
      const flag = <ReactCountryFlag
                    key={country}
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

  const detailsCountries = ((COUNTRIES != null) && (COUNTRIES.length > 0)) && <span className='single-left-detail'><span className='bold'>{COUNTRIES.length > 1 ? 'Countries' : 'Country'}: </span>
    {COUNTRIES.map((country) => {
      const flag = <ReactCountryFlag
                    key={country.name}
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

  return (
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
          {detailsLastAirDate}
        </div>
  )
}

export default Left
