import React, { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Spinner from './components/Spinner'
import LoadingBar from './components/TopBar'

const Category = lazy(async () => await import('./pages/Category'))
const Single = lazy(async () => await import('./pages/Single'))

function App (): JSX.Element {
  return (
    <div className="App">
      <Header />
      <LoadingBar />
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
