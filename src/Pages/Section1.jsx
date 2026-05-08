import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();

  const slides = [
    {
      img: "https://chromeindustries.com/cdn/shop/files/YearMonthDay_HP-MiniKadetReviews-Desktop_1.jpg?v=1777045669&width=2000",
      text1: "Top Rated for a Reason",
      text: "SIMPLE AND COMFORTABLE",
      button: "Get the Mini",
      align: "left",
      route: "/sling", // 👈 added route
    },
    {
      img: "https://chromeindustries.com/cdn/shop/files/041526_Rim-homepage-Desktop-V2_1.jpg?v=1776289664&width=2000",
      text1: "Everyday Organizers",
      text: "WEAR IT, STASH IT",
      button: "Find Your Setup",
      align: "center",
      route: "/bags", // 👈 added route
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full overflow-hidden">

      {/* Image */}
      <img
        src={currentSlide.img}
        alt=""
        className="w-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-center text-white uppercase px-4
        ${
          currentSlide.align === "center"
            ? "items-center text-center"
            : "items-center text-center md:items-start md:text-left md:pl-20"
        }`}
      >
        {/* Small heading */}
        <h2 className="text-sm md:text-base tracking-widest mb-2 opacity-90">
          {currentSlide.text1}
        </h2>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {currentSlide.text}
        </h1>

        {/* Button */}
        <button
          onClick={() => navigate(currentSlide.route)}
          className="bg-white cursor-pointer text-black px-6 py-3 text-sm font-semibold tracking-wide hover:bg-gray-300 transition"
        >
          {currentSlide.button}
        </button>
      </div>

    </div>
  );
};

export default Section1;