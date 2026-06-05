import React, { useState, useRef, useEffect } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

import Cart from "./Cart";
import { searchProducts } from "../api/productApi";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const menuRef = useRef();
  const searchRef = useRef();

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

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NAV LINKS (reuse for mobile)
  const navLinks = [
    { name: "Bags", path: "/category/bags" },
    { name: "Slings", path: "/category/sling" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Shoes", path: "/category/shoes" },
    { name: "New Deals", path: "/category/new" },
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-medium border-b"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;