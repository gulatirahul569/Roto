import React, { useState, useRef, useEffect } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

import { MdLocationOn } from "react-icons/md";
import { useLocation } from "../Context/LocationContext";

import Cart from "./Cart";
import { searchProducts } from "../api/productApi";
import { GiHandBag } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { MdOutlineWatch } from "react-icons/md";
import { PiShoppingBagOpen } from "react-icons/pi";
import { BsStars } from "react-icons/bs";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartOpen]);

  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  
  const mobileMenuRef = useRef();
  const menuRef = useRef();
  const searchRef = useRef();

  const { location, loading, error, detectLocation } = useLocation();

  useEffect(() => {
    if (!location) detectLocation();
  }, []);

  const [results, setResults] = useState([]);

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // SEARCH
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) {
        searchProducts(searchTerm)
          .then((data) => setResults(data))
          .catch((err) => console.log(err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // NAV LINKS (reuse for mobile)
  const navLinks = [
    { name: "Bags", path: "/category/bags", icon: <GiHandBag /> },
    { name: "Slings", path: "/category/sling", icon: <PiShoppingBagOpen /> },
    { name: "Accessories", path: "/category/accessories", icon: <MdOutlineWatch /> },
    { name: "Shoes", path: "/category/shoes", icon: <GiRunningShoe /> },
    { name: "New Deals", path: "/category/new", icon: <BsStars /> },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex justify-between items-center h-16 px-4 md:px-8">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full"
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>

            <Link to="/">
              <img
                className="h-16 md:h-20 object-contain"
                src="/roto_logo_transparent.png"
                alt="logo"
              />
            </Link>
            <button
              onClick={detectLocation}
              title={error || "Click to refresh location"}
              className="hidden sm:flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-black bg-zinc-100 px-3 py-2 rounded-full max-w-40 truncate"
            >
              <MdLocationOn size={16} className="shrink-0" />
              {loading
                ? "Locating..."
                : location
                ? location.area || location.city
                : "Enable Location"}
            </button>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-10 uppercase font-semibold text-sm">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative p-2 bg-zinc-100 rounded-full">
              <FaHeart />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* SEARCH */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 bg-zinc-100 rounded-full"
              >
                <CiSearch />
              </button>

              {searchOpen && (
                <div className="absolute top-full mt-3 -translate-x-2/3 w-80 bg-white rounded-xl shadow-lg z-50">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 outline-none bg-gray-100"
                  />

                  <div className="max-h-72 overflow-y-auto">
                    {results.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          navigate(`/product/${item._id}`);
                          setSearchOpen(false);
                          setSearchTerm("");
                        }}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img src={item.image} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-500">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 bg-zinc-100 rounded-full"
            >
              <CiShoppingCart size={22} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalQty}
                </span>
              )}
            </button>

            {/* USER */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 bg-zinc-100 rounded-full"
              >
                <FaRegUser />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-600 text-xs">{user.email}</p>
                      </div>

                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 MOBILE MENU DROPDOWN */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 w-full z-50 px-4 pb-4 -mt-1
  transition-all duration-300 origin-top
  ${mobileMenuOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
            }`}
        >
          <div className="bg-white border border-zinc-100 shadow-xl rounded-2xl overflow-hidden">

            {navLinks.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between px-5 py-4
          text-[15px] font-medium text-zinc-800
          hover:bg-zinc-50 transition-all duration-200
          ${index !== navLinks.length - 1
                    ? "border-b border-zinc-100"
                    : ""
                  }
        `}
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <span className="text-lg text-zinc-500 group-hover:text-black transition-colors">
                    {item.icon}
                  </span>

                  <span className="tracking-wide group-hover:translate-x-1 transition-transform duration-200">
                    {item.name}
                  </span>

                  {/* NEW badge */}
                  {item.name === "New Deals" && (
                    <span className="text-[10px] px-2 py-0.5 bg-black text-white rounded-full ml-1">
                      NEW
                    </span>
                  )}
                </div>

                {/* RIGHT ARROW */}
                <span className="text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all">
                  ›
                </span>
              </Link>
            ))}

          </div>
        </div>

      </div>

      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;