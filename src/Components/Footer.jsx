import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { TbBrandTwitter } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";


const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 md:px-20 pt-8 pb-5">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-5">

        {/* BRAND */}
        <div className="flex flex-col">
            
          <h1 className="text-2xl font-bold uppercase mb-4">
            Roto
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Built for movement. Durable bags, shoes and everyday gear designed
            for city life and adventure.
          </p>
        </div>

        {/* SHOP */}
        <div className="flex flex-col  items-center">
          <h2 className="font-semibold uppercase mb-4 mr-10 ">Shop</h2>
          <ul className=" text-gray-400 text-sm ">
            <li><Link to="/main/bags">Bags</Link></li>
            <li><Link to="/main/shoes">Shoes</Link></li>
            <li><Link to="/main/sling">Slings</Link></li>
            <li><Link to="/main/accessories">Accessories</Link></li>
            <li><Link to="/main/new">New Arrivals</Link></li>
          </ul>
        </div>

        {/* HELP */}
        <div className="flex flex-col  items-center ">
          <h2 className="font-semibold uppercase mb-4 mr-12">Help</h2>
          <ul className=" text-gray-400 text-sm">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col  items-center">
          <h2 className="font-semibold uppercase mb-4 mr-5">Follow</h2>
          <ul className="space-y-1 text-gray-400 text-sm ">
            <li className="flex gap-1 items-center"><FaInstagram />Instagram</li>
            <li className="flex gap-1 items-center"><CiFacebook />Facebook</li>
            <li className="flex gap-1 items-center"><TbBrandTwitter />Twitter</li>
            <li className="flex gap-1 items-center"><LuYoutube />YouTube</li>
          </ul>
        </div>

      </div>
      

      {/* BOTTOM */}
      <div className="pt-4 flex flex-col md:flex-row justify-between text-gray-400 text-sm gap-3">
        <p>© {new Date().getFullYear()} Roto. All rights reserved.</p>

        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;