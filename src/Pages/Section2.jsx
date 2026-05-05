import React from 'react'
import { CiCircleChevRight } from "react-icons/ci";

const Section2 = () => {
  return (
    <div className='flex flex-col'>

      <div className='flex justify-center items-center font-bold uppercase text-4xl p-8'>
        Made for What’s Ahead. Since 1995.
      </div>

      <div className='flex justify-between px-12' >

        {/* Card */}
        <div className='relative group cursor-pointer overflow-hidden'>
          <img
            className='h-92 group-hover:scale-105 transition duration-300  '
            src="https://chromeindustries.com/cdn/shop/files/Kadet_Max_Steel_Blue_SQ_HP_1.jpg?v=1777073141&width=1200"
            alt=""
          />

          {/* Always visible text */}
          <div className='absolute bottom-4 left-4 p-2.5 pr-3.5 pl-3.5 bg-white '>
            <button className='text-xl font-bold '>Shop Bags</button>
          </div>

          {/* Icon (appears on hover) */}
          <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300'>
            <div className='bg-white p-1 rounded-full'>
              <CiCircleChevRight className='text-black text-3xl' />
            </div>
          </div>
        </div>

        {/* Repeat for others */}
        <div className='relative group cursor-pointer overflow-hidden'>
          <img
            className='h-92 group-hover:scale-105 transition duration-300'
            src="https://chromeindustries.com/cdn/shop/files/HP_Accessories_sm_sq_2_1.jpg?v=1769108394&width=1200"
            alt=""
          />
          <div className='absolute bottom-4 left-4 p-2.5 pr-3.5 pl-3.5 bg-white'>
            <button className='text-xl font-bold '>Accessories</button>
          </div>
          <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300'>
            <div className='bg-white p-1 rounded-full'>
              <CiCircleChevRight className='text-black text-3xl' />
            </div>
          </div>
        </div>

        <div className='relative group cursor-pointer overflow-hidden '>
          <img
            className='h-92 group-hover:scale-105 transition duration-300 '
            src="https://chromeindustries.com/cdn/shop/files/hp_pack_it_up_20L_1.jpg?v=1777073743&width=1200"
            alt=""
          />
          <div className='absolute bottom-4 left-4 p-2.5 pr-3.5 pl-3.5 bg-white'>
            <button className='text-xl font-bold'>New Arrivals</button>
          </div>
          <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300'>
            <div className='bg-white p-1 rounded-full'>
              <CiCircleChevRight className='text-black text-3xl ' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Section2