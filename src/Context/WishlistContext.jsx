import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const getWishlistKey = () => {
    return user
      ? `wishlist_${user._id}`
      : "wishlist_guest";
  };

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist whenever user changes
  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem(getWishlistKey())
      ) || [];

    setWishlist(savedWishlist);
  }, [user]);

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      getWishlistKey(),
      JSON.stringify(wishlist)
    );
  }, [wishlist, user]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev.filter(
          (item) => item._id !== product._id
        );
      }

      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);