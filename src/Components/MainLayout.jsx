import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeaderSlider from "./HeaderSlider";

const MainLayout = () => {
  const location = useLocation();

   const showSlider =
    location.pathname === "/" ||
    location.pathname.includes("/category");

  return (
    <>
      {showSlider && <HeaderSlider />}
      <Navbar />

      {/* SHOW ONLY ON  */}

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;