import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* ALL CHILD PAGES RENDER HERE */}
      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;