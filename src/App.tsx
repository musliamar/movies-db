import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Search from './Components/Search/Search'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'

function App (): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Search />
      <Routes>
        <Route path=":category" element={ <Main /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
