// import React from 'react'
import { img } from '.././images/Url'

const Card = () => {
  return (
    
      <div className=' lg:w-full w-95 rounded-xl m-2  h-85 bg-black relative overflow-hidden'>
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full lg:w[98%] h-full object-center object-cover"
        />
     
    </div>
  )
}

export default Card
