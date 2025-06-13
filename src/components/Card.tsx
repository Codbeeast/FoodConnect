import React from 'react'
import { img } from '.././images/Url'

const Card = () => {
  return (
    <div>
      <div className=' lg:w-303 w-108 rounded-xl m-2  h-85 bg-black relative overflow-hidden'>
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-center object-cover"
        />
      </div>
    </div>
  )
}

export default Card
