// import React from 'react'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Card2 from './components/Card2';
// import {ModeToggle} from './components/ModeToggle'
import {Routes,Route} from 'react-router-dom'
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

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
      <div id="home">
  <Card /> {/* Your banner / welcome component */}
</div>
 
      
      <Card2 />
      {/* <ModeToggle/> */}
      
<div id="services">
  <Services/> {/* Your banner / welcome component */}
</div>
      <div id="about">
  <About/> {/* Your banner / welcome component */}
</div>
<div id="contact">
  <Contact/> {/* Your banner / welcome component */}
  </div>
    </>
  )
}

export default App
