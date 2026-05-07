import React from 'react'
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='flex justify-between items-center max-h-12 pl-8 pr-8 bg-white sticky top-0 z-50'>
      <div >
        <Link to="/">
          <img className='h-24 pl-9' src="/roto_logo_transparent.png" alt="logo" />
        </Link>
      </div>
      <div className=''>
        <ul className="flex gap-14 uppercase font-semibold">


  <li>
    <Link to="/bags" className="transition hover:text-black text-black/70">
      Bags
    </Link>
  </li>

  <li>
    <Link to="/sling" className="transition hover:text-black text-black/70">
      Slings
    </Link>
  </li>

  <li>
    <Link to="/accessories" className="transition hover:text-black text-black/70">
      Accessories
    </Link>
  </li>

  <li>
    <Link to="/shoes" className="transition hover:text-black text-black/70">
      Shoes
    </Link>
  </li>

  <li>
    <Link to="/new" className="transition hover:text-black text-black/70">
      New Deals
    </Link>
  </li>
</ul>
      </div>
      <div className='' >
        <ul className='flex gap-4'>
          <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><BsCurrencyDollar /></li>
          <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><CiSearch /></li>
          <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><CiShoppingCart /></li>
          <li className='bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 ease-in'><FaRegUser /></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
