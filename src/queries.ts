
import { API_KEY } from './env.dev'
import { IEntriesData } from './interfaces'

interface Props {
  toFetch: string
}

export async function fetchTopRated ({ toFetch }: Props): Promise<IEntriesData> {
  return await fetch(`https://api.themoviedb.org/3/${toFetch}/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return await response.json()
    })
}
