// import React from 'react'
import Avatar from './Avatar'
const Navbar = () => {
  return (
   
     <nav className="lg:w-full w-[93vw] bg-black text-white flex px-4 py-2 mb-1  justify-between items-center">
  <h1>FoodConnect</h1>

  <div className="flex gap-2 lg:gap-10">
    <p>Home</p>
    <p>About</p>
    <p>Services</p>
    <p>Contact</p>
  </div>

  <div className="ml-3">
    <Avatar />
  </div>
</nav>
    
  )
}

export default Navbar

