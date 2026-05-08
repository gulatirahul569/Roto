import React, { useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

import Cart from "./Cart";
import { useCart } from "../Components/CartContext";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="flex justify-between items-center h-16 px-8 bg-white sticky top-0 z-50 shadow-sm">

        {/* LOGO */}
        <div>
          <Link to="/">
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
            <Link to="/bags" className="text-black/70 hover:text-black transition">
              Bags
            </Link>
          </li>

          <li>
            <Link to="/sling" className="text-black/70 hover:text-black transition">
              Slings
            </Link>
          </li>

          <li>
            <Link to="/accessories" className="text-black/70 hover:text-black transition">
              Accessories
            </Link>
          </li>

          <li>
            <Link to="/shoes" className="text-black/70 hover:text-black transition">
              Shoes
            </Link>
          </li>

          <li>
            <Link to="/new" className="text-black/70 hover:text-black transition">
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

          <button className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition">
            <FaRegUser />
          </button>

        </div>
      </div>

      {/* CART DRAWER */}
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export default Navbar;