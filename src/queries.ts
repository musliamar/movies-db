
import { API_KEY } from './env.dev'
import { IMoviesData } from './interfaces'

export async function fetchTopRatedMovies (): Promise<IMoviesData[]> {
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
  const body = await response.json()
  return body
}
