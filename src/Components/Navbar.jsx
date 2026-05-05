import React from 'react'
import { CiSearch , CiShoppingCart  } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";


const Navbar = () => {
  return (
    <div className='flex justify-between items-center min-h-14 pl-8 pr-8 bg-white'>
      <div className='' >
        logo
      </div>
      <div className=''>
        <ul className='flex  gap-18 uppercase font-bold  '>
            <li>New & Featured</li>
            <li>Bags</li>
            <li>Slings</li>
            <li>Accessories</li>
            <li>Sale</li>
        </ul>
      </div>
      <div className='' >
        <ul className='flex gap-4'>
            <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><MdCurrencyRupee /></li>
            <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><CiSearch /></li>
            <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><CiShoppingCart /></li>
            <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><FaRegUser /></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
