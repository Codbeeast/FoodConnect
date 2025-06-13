// import React from 'react'
import Avatar from './Avatar'
const Navbar = () => {
  return (
   
      <nav className='lg:w-300 w-93 bg-black text-white flex relative px-4 py-2 mb-1 flex justify-between items-center '>
        <h1>FoodConnect</h1>
        <div className='flex lg:w-50 w-15 absolute lg:left-110 left-28 lg:gap-10 gap-2'>
       <p>Home</p>
       <p>About</p>
       <p>Services</p>
       <p>Contact</p>
      </div>
      <div className=''>
      <Avatar/>
      </div>
      </nav>
    
  )
}

export default Navbar

