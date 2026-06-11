import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { TbBrandTwitter } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* MOBILE */}
      <div className="lg:hidden px-5 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest">ROTO</h1>

          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Built for movement. Durable bags, shoes and everyday gear designed
            for city life and adventure.
          </p>
        </div>

        <div className="border-t border-zinc-800 my-6" />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-s font-semibold uppercase mb-3">Shop</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/category/bags">Bags</Link>
              </li>
              <li>
                <Link to="/category/shoes">Shoes</Link>
              </li>
              <li>
                <Link to="/category/sling">Slings</Link>
              </li>
              <li>
                <Link to="/category/accessories">Accessories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-s font-semibold uppercase mb-3">Help</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Shipping</li>
              <li>Returns</li>
              <li>Tracking</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-s font-semibold uppercase mb-3">Follow</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        <div className=" border-zinc-800 my-6" />

        <div className="text-center text-[15px] text-gray-500">
          © {new Date().getFullYear()} Roto. All rights reserved.
        </div>
        
      </div>

      {/* DESKTOP - YOUR CURRENT FOOTER */}
      <div className="hidden lg:block">
        <footer className="bg-black text-white px-4 sm:px-8 md:px-16 lg:px-24 pt-10 pb-6">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
            {/* BRAND */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold uppercase mb-4">Roto</h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Built for movement. Durable bags, shoes and everyday gear
                designed for city life and adventure.
              </p>
            </div>

            {/* SHOP */}
            <div className="flex flex-col">
              <h2 className="font-semibold uppercase mb-4 text-sm tracking-wider">
                Shop
              </h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/category/bags"
                    className="hover:text-white transition"
                  >
                    Bags
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/shoes"
                    className="hover:text-white transition"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/sling"
                    className="hover:text-white transition"
                  >
                    Slings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/accessories"
                    className="hover:text-white transition"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/new"
                    className="hover:text-white transition"
                  >
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* HELP */}
            <div className="flex flex-col">
              <h2 className="font-semibold uppercase mb-4 text-sm tracking-wider">
                Help
              </h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Shipping</li>
                <li className="hover:text-white cursor-pointer">Returns</li>
                <li className="hover:text-white cursor-pointer">
                  Order Tracking
                </li>
                <li className="hover:text-white cursor-pointer">Size Guide</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div className="flex flex-col">
              <h2 className="font-semibold uppercase mb-4 text-sm tracking-wider">
                Follow
              </h2>

              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-2 items-center hover:text-white cursor-pointer">
                  <FaInstagram /> Instagram
                </li>

                <li className="flex gap-2 items-center hover:text-white cursor-pointer">
                  <CiFacebook /> Facebook
                </li>

                <li className="flex gap-2 items-center hover:text-white cursor-pointer">
                  <TbBrandTwitter /> Twitter
                </li>

                <li className="flex gap-2 items-center hover:text-white cursor-pointer">
                  <LuYoutube /> YouTube
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-3">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Roto. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span className="hover:text-white cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Cookies</span>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
