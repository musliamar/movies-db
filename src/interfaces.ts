export interface IEntriesData {
  page: number
  results: ISingleEntryData[]
  total_pages: number
  total_results: number
}

export interface IVideosData {
  id: number
  results: ISingleVideoData[]
}

export interface ISingleAllData {
  detailsData: ISingleEntryData
  videosData?: ISingleVideoData[]
}

export interface ISingleVideoData {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface ISingleEntryData {
  backdrop_path?: string
  created_by?: [{
    id?: number
    credit_id?: string
    name?: string
    gender?: number
    profile_path?: string }]
  episode_run_time?: number[]
  first_air_date?: string
  genres?: {
    id?: number
    name?: string }
  homepage?: string
  id?: number
  belongs_to_collection?: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string }
  in_production?: boolean
  languages?: string[]
  last_air_date?: string
  last_episode_to_air?: {
    air_date?: string
    episode_number?: number
    id?: number
    name?: string
    overview?: string
    production_code?: string
    season_number?: number
    still_path?: string
    vote_average?: number
    vote_count?: number }
  name?: string
  next_episode_to_air?: string
  networks?: [{
    name?: string
    id?: number
    logo_path?: string
    origin_country?: string }]
  number_of_episodes?: number
  number_of_seasons?: number
  origin_country?: string[]
  original_language?: string
  original_name?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: [{
    id?: number
    logo_path?: string
    name?: string
    origin_country?: string}]
  production_countries?: [{
    iso_3166_1?: string
    name?: string}]
  seasons?: [{
    air_date?: string
    episode_count?: number
    id?: number
    name?: string
    overview?: string
    poster_path?: string
    season_number?: number }]
  spoken_languages?: [{
    english_name?: string
    iso_639_1?: string
    name?: string}]
  status?: string
  tagline?: string
  type?: string
  vote_average?: number
  vote_count?: number
  adult?: boolean
  budget?: number
  imdb_id?: string
  original_title?: string
  release_date?: string
  revenue?: number
  runtime?: number
  title?: string
  video?: boolean
}
