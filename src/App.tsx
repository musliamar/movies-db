import React from 'react'
import './App.css'
import Category from './Components/Category'
import Single from './Components/Single'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={ <Category /> } />
          <Route path=":category">
            <Route index element={ <Category /> } />
            <Route path=":singleId" element={ <Single /> } />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
