import React, { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { fetchTopRatedMovies } from './queries'
import { IMoviesData } from './interfaces'

function App (): JSX.Element {
  const [movies, setMovies] = useState({})

  useEffect(() => {
    fetchTopRatedMovies().then((data: IMoviesData[]) => {
      setMovies(data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  console.log(movies)
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        <Link to={''}>Movies</Link>
        <Link to={''}>TV Shows</Link>
        </nav>
      </header>
      <main>
        Search
        <div className='movies-container'>
          <div className='first-movie'></div>
        </div>
      </main>
    </div>
  )
}

export default App
