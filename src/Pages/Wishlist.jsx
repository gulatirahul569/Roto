import React from "react";
import { useWishlist } from "../Components/WishlistContext";
import ProductCard from "../Components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

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
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;