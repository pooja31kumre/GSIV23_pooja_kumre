
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import DetailPage from './DetailPage'
import Error from './Error'
import "./App.css"

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='movie/:id' element={<DetailPage/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App