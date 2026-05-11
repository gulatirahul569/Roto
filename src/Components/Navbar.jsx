import React, { useState, useRef, useEffect } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import Cart from "./Cart";
import { useCart } from "../Components/CartContext";


const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();

  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="flex justify-between items-center h-16 px-8 bg-white sticky top-0 z-50 shadow-sm">

        {/* LOGO */}
        <div>

          <Link to="/main"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }} >
            <img
              className="h-20 object-contain"
              src="/roto_logo_transparent.png"
              alt="logo"
            />
          </Link>

        </div>

        {/* MENU */}
        <ul className="flex gap-10 uppercase font-semibold text-sm">

          <li>
            <Link to="/main/bags" className="text-black/70 hover:text-black transition">
              Bags
            </Link>
          </li>

          <li>
            <Link to="/main/sling" className="text-black/70 hover:text-black transition">
              Slings
            </Link>
          </li>

          <li>
            <Link to="/main/accessories" className="text-black/70 hover:text-black transition">
              Accessories
            </Link>
          </li>

          <li>
            <Link to="/main/shoes" className="text-black/70 hover:text-black transition">
              Shoes
            </Link>
          </li>

          <li>
            <Link to="/main/new" className="text-black/70 hover:text-black transition">
              New Deals
            </Link>
          </li>

        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-3">

          <button className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition">
            <BsCurrencyDollar />
          </button>

          <button className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition">
            <CiSearch />
          </button>

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

          <div ref={menuRef} className="relative">

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
            >
              <FaRegUser />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border py-2 z-50">

                {user ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
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

      {/* CART DRAWER */}
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;