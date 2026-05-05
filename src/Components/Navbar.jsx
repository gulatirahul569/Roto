import React from 'react'
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
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
        <ul className='flex gap-14 uppercase font-bold'>
          <li><Link to="/new">New & Featured</Link></li>
          <li><Link to="/bags">Bags</Link></li>
          <li><Link to="/sling">Slings</Link></li>
          <li><Link to="/accessories" >Accessories</Link></li>
          <li><Link to="/shoes">Shoes</Link></li>
          <li><Link to="/sale">Sale</Link></li>
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
