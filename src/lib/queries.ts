
import { API_KEY } from './env.dev'
import { IEntriesData, ISingleEntryData, IVideosData } from './interfaces'

interface Props {
  categoryToFetch: string
  idToFetch?: string
  queryToFetch?: string
}

export async function fetchTopRated ({ categoryToFetch }: Props): Promise<IEntriesData> {
  return await fetch(`https://api.themoviedb.org/3/${categoryToFetch}/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json()
    })
}

export async function fetchSingle ({ idToFetch, categoryToFetch }: Props): Promise<ISingleEntryData> {
  return await fetch(`https://api.themoviedb.org/3/${categoryToFetch}/${idToFetch as string}?api_key=${API_KEY}&language=en-US`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json()
    })
}

export async function fetchByString ({ queryToFetch, categoryToFetch }: Props): Promise<IEntriesData> {
  return await fetch(`https://api.themoviedb.org/3/search/${categoryToFetch}?api_key=${API_KEY}&query=${queryToFetch as string}&language=en-US&page=1&include_adult=false`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json()
    })
}

export async function fetchTrailer ({ idToFetch, categoryToFetch }: Props): Promise<IVideosData> {
  return await fetch(`https://api.themoviedb.org/3/${categoryToFetch}/${idToFetch as string}/videos?api_key=${API_KEY}&language=en-US`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json()
    })
}
