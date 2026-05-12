import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";



import Section1 from "./Pages/Section1";
import Section2 from "./Pages/Section2";
import Section3 from "./Pages/Section3";
import MainLayout from "./Components/MainLayout";
import ProductDetails from "./Pages/ProductDetails";
import CategoryPage from "./Pages/CategoryPage";
import Wishlist from "./Pages/Wishlist";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* 1. HOME SPLASH */}
        <Route path="/" element={<Home />} />

        {/* 2. LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 3. MAIN APP WRAPPER */}
        <Route path="/main" element={<MainLayout />}>

          {/* HOME INSIDE MAIN */}
          <Route index element={
            <>
              
              <Section1 />
              <Section2 />
              <Section3 />
            </>
          } />

          {/* DYNAMIC CATEGORY PAGE */}
          <Route path="category/:type" element={<CategoryPage />} />

          {/* PRODUCT DETAILS */}
          <Route path="product/:id" element={<ProductDetails />} />

          <Route path="wishlist" element={<Wishlist />} />

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
};

export default App;