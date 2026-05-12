import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeaderSlider from "./HeaderSlider";

const MainLayout = () => {
  const location = useLocation();

  const showSlider = location.pathname === "/main";

  return (
    <>
      {showSlider && <HeaderSlider />}
      <Navbar />

      {/* SHOW ONLY ON /main */}

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;