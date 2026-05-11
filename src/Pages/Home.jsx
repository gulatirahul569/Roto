import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/login")}
      className="h-screen w-full relative overflow-hidden cursor-pointer"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/roto-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

        <h1 className="text-6xl md:text-8xl font-bold tracking-[14px]">
          ROTO
        </h1>

        <p className="mt-4 text-white/70 text-sm md:text-lg tracking-widest">
          ELEVATE YOUR STYLE
        </p>

        <p className="mt-2 text-white/40 text-xs uppercase">
          Premium Bags & Lifestyle
        </p>

        <div className="mt-8 px-6 py-2 border border-white/30 rounded-full text-sm tracking-widest hover:bg-white hover:text-black transition">
          Enter Store
        </div>

       
      </div>
    </div>
  );
};

export default Home;