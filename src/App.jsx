import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import MainLayout from "./Components/MainLayout";
import Section1 from "./Pages/Section1";
import Section2 from "./Pages/Section2";
import Section3 from "./Pages/Section3";
import Section4 from "./Pages/Section4";

import ProductDetails from "./Pages/ProductDetails";
import CategoryPage from "./Pages/CategoryPage";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import ScrollToTop from "./Components/ScroltoTop";
import AdminUsers from "./Admin/AdminUsers";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminAddProduct from "./Admin/AdminAddProduct";
import AdminOrders from "./Admin/AdminOrders";
import AdminSettings from "./Admin/AdminSettings";

const App = () => {
  const { user } = useAuth(); // ✅ REAL reactive auth

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminLayout />
              : <Navigate to="/" />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} /> 
          <Route path="settings" element={<AdminSettings />} />
          
        </Route>

        {/* MAIN LAYOUT */}
        <Route path="/" element={<MainLayout />}>

          <Route
            index
            element={
              <>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
              </>
            }
          />

          <Route path="category/:type" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetails />} />

          {/* PROTECTED */}
          <Route
            path="wishlist"
            element={user ? <Wishlist /> : <Navigate to="/login" />}
          />

          <Route
            path="checkout"
            element={user ? <Checkout /> : <Navigate to="/login" />}
          />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;