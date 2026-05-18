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
import { Products } from "../Data/Products";

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

  const filteredProducts = searchTerm
    ? Products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white shadow-sm ">

        <div className="flex justify-between items-center h-16 px-4 md:px-8">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
            >
              {mobileMenuOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>

            {/* LOGO */}
            <Link to="/">
              <img
                className="h-16 md:h-20 object-contain"
                src="/roto_logo_transparent.png"
                alt="logo"
              />
            </Link>
          </div>

          {/* DESKTOP MENU (your original) */}
          <ul className="hidden md:flex gap-10 uppercase font-semibold text-sm">
            <li><Link to="/category/bags" className="text-black/70 hover:text-black">Bags</Link></li>
            <li><Link to="/category/sling" className="text-black/70 hover:text-black">Slings</Link></li>
            <li><Link to="/category/accessories" className="text-black/70 hover:text-black">Accessories</Link></li>
            <li><Link to="/category/shoes" className="text-black/70 hover:text-black">Shoes</Link></li>
            <li><Link to="/category/new" className="text-black/70 hover:text-black">New Deals</Link></li>
          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="relative bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
            >
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
                className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
              >
                <CiSearch />
              </button>

              {searchOpen && (
                <div className="
                  fixed md:absolute
                  top-20 md:top-full
                  left-[5%] right-[5%]
                  md:left-auto md:right-0 md:w-80
                  bg-white shadow-lg border border-gray-100
                  rounded-xl z-50 overflow-hidden
                ">

                  {/* INPUT */}
                  <div className="border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 outline-none bg-gray-50"
                    />
                  </div>

                  {/* RESULTS */}
                  <div className="max-h-72 overflow-y-auto">

                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/product/${item.id}`);
                            setSearchOpen(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">₹{item.price}</p>
                          </div>
                        </div>
                      ))
                    ) : searchTerm ? (
                      <p className="p-3 text-sm text-gray-500">No products found</p>
                    ) : null}

                  </div>
                </div>
              )}

            </div>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
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
                className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
              >
                <FaRegUser />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border py-2 z-50">

                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-zinc-100 text-sm"
                    >
                      Login
                    </Link>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 bg-white border-t
          ${mobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}
        `}>
          <ul className="flex flex-col px-6 uppercase font-semibold text-sm">
            <li className="py-3 border-b"><Link to="/category/bags">Bags</Link></li>
            <li className="py-3 border-b"><Link to="/category/sling">Slings</Link></li>
            <li className="py-3 border-b"><Link to="/category/accessories">Accessories</Link></li>
            <li className="py-3 border-b"><Link to="/category/shoes">Shoes</Link></li>
            <li className="py-3"><Link to="/category/new">New Deals</Link></li>
          </ul>
        </div>
      </div>

      {/* CART */}
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;