import React, { lazy, Suspense } from 'react'
import './App.css'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Spinner from './Components/Spinner'

const Category = lazy(async () => await import('./Components/Category/Category'))
const Single = lazy(async () => await import('./Components/Single/Single'))

function App (): JSX.Element {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/">
            <Route index element={ <Category /> } />
            <Route path=":category">
              <Route index element={ <Category /> } />
              <Route path=":singleId" element={ <Single /> } />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
