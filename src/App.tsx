// import React from 'react'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Card2 from './components/Card2';
// import {ModeToggle} from './components/ModeToggle'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/about"/>
        <Route path="/services" />
        <Route path="/contact" />
      </Routes>
      <Card />
      <Card2 />
      {/* <ModeToggle/> */}
    </>
  )
}

export default App
