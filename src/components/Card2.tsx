// import React from 'react'
import { img2,img3 } from '.././images/Url'

const Card2 = () => {
  return (
    <div className='relative mt-4 p-3 lg:w-300 w-93 '>

    <div className='lg:h-110 lg:w-290 w-full ml-0.5  px-4 py-4 mb-2 p-5 absolute lg:left-6 border-gray-400 border flex flex-col gap-4 rounded-xl'>
      <div className='flex text-white justify-between gap-5'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit aliquid aperiam vel eaque officiis quis deleniti repudiandae in velit itaque. Totam quibusdam excepturi nisi voluptatem perferendis, animi deleniti molestias sit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam tempora veniam quos ea dolorem molestiae, sequi error, porro nobis cupiditate minus temporibus. Quo similique sapiente maxime voluptatem fugit illo distinctio!</p>
        </div>
        <div className='w-full h-37 flex gap-3 lg:gap-14'>
        <img
          src={img2}
          alt=""
          className="lg:w-140 lg:h-79 w-50 h-40 rounded-xl"
        />
        <img
          src={img3}
          alt=""
          className="lg:w-120 lg:h-70 w-33 h-30 rounded-xl"
          />
      </div>
    </div>
          </div>
  )
}

export default Card2
