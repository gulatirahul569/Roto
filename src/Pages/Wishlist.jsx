import React from "react";
import { useWishlist } from "../Context/WishlistContext";
import ProductCard from "../Components/ProductCard";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();

if (!user) {
  return <Navigate to="/login" />;
}

  if (wishlist.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No Wishlist Items ❤️</h1>
      </div>
    );
  }

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;