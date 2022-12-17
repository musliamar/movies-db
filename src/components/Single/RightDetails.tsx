import React from 'react'
import { BACKDROP_URL, AUTHOR_IMAGE_URL, ORIGINAL_IMAGE_URL } from '../../lib/constants'
import DEFAULT_PLACEHOLDER from '../../media/default-placeholder.png'
import { ISingleEntryData } from '../../lib/interfaces'

interface Props {
  detailsData: ISingleEntryData
}

function Right ({ detailsData }: Props): JSX.Element {
  const {
    belongs_to_collection: COLLECTION,
    seasons: SEASONS,
    networks: NETWORKS,
    created_by: AUTHORS,
    production_companies: COMPANIES
  } = detailsData

  const detailsAuthors = ((AUTHORS != null) && (AUTHORS.length > 0)) &&
    <><h2>{AUTHORS.length > 1 ? 'Authors' : 'Author'}</h2>
    <div className='group'>
      {AUTHORS.map((author) => {
        const { profile_path: authorProfilePath, name: authorName } = author
        const authorPoster = authorProfilePath as string
        const authorPosterPath = (authorPoster !== null) ? `${AUTHOR_IMAGE_URL}/${authorPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={authorName} className='single-in-group'>
            <img width='100' loading='lazy' src={authorPosterPath} alt='Author picture' />
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
            <img width='100' loading='lazy' src={collectionPosterPath} alt='Collection poster' />
            <span>{COLLECTION.name}</span>
          </div>
        </div></>
    : ((SEASONS != null) && (SEASONS.length > 0)) &&
      <><h2>{SEASONS.length > 1 ? 'Seasons' : 'Season'}</h2>
      <div className='group'>
      {SEASONS.map((season) => {
        const { poster_path: seasonPath, name: seasonName } = season
        const seasonPoster = seasonPath as string
        const seasonPosterPath = (seasonPoster !== null) ? `${BACKDROP_URL}/${seasonPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={seasonName} className='single-in-group'>
            <img width='100' loading='lazy' src={seasonPosterPath} alt='Season poster' />
            <span>{seasonName}</span>
          </div>)
      })}</div></>

  const detailsCompanies = ((COMPANIES != null) && ((COMPANIES.length > 0))) &&
    <><h2>{COMPANIES.length > 1 ? 'Companies' : 'Company'}</h2>
    <div className='group'>
      {COMPANIES.map((company) => {
        const { id: companyId, name: companyName, logo_path: companyLogo } = company
        const companyPoster = companyLogo as string
        const companyPosterPath = (companyPoster !== null) ? `${ORIGINAL_IMAGE_URL}/${companyPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={companyId} className='single-in-group'>
            <img width='100' loading='lazy' src={companyPosterPath} alt='Company logo' />
            <span>{companyName}</span>
          </div>)
      })}
    </div></>

  const detailsNetworks = ((NETWORKS != null) && ((NETWORKS.length > 0))) &&
    <><h2>{NETWORKS.length > 1 ? 'Networks' : 'Network'}</h2>
    <div className='group'>
      {NETWORKS.map((network) => {
        const { name: networkName, logo_path: networkLogo } = network
        const networkPoster = networkLogo as string
        const networkPosterPath = (networkPoster !== null) ? `${ORIGINAL_IMAGE_URL}/${networkPoster}` : DEFAULT_PLACEHOLDER
        return (
          <div key={networkName} className='single-in-group'>
            <img width='100' loading='lazy' src={networkPosterPath} alt='Network logo' />
            <span>{networkName}</span>
          </div>)
      })}
    </div></>

  return (
    <div className='right-details'>
          {detailsAuthors}
          {detailsSeasonsOrCollections}
          {detailsCompanies}
          {detailsNetworks}
        </div>
  )
}

export default Right
