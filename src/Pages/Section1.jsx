import React, { useEffect, useState } from "react";

const Section1 = () => {
  const slides = [
    {
      img: "https://chromeindustries.com/cdn/shop/files/YearMonthDay_HP-MiniKadetReviews-Desktop_1.jpg?v=1777045669&width=2000",
      text1: "Top Rated for a Reason",
      text: "SIMPLE AND COMFORTABLE",
      button: "Get the Mini",
      align: "left",
    },
    {
      img: "https://chromeindustries.com/cdn/shop/files/041526_Rim-homepage-Desktop-V2_1.jpg?v=1776289664&width=2000",
      text1: "Everyday Organizers",
      text: "WEAR IT, STASH IT",
      button: "Find Your Setup",
      align: "center",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Image */}
      <img
        src={slides[currentIndex].img}
        alt=""
        className="w-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-center text-white uppercase px-4
        ${
          slides[currentIndex].align === "center"
            ? "items-center text-center"
            : "items-center text-center md:items-start md:text-left md:pl-20"
        }`}
      >
        {/* Small heading */}
        <h2 className="text-sm md:text-base tracking-widest mb-2 opacity-90">
          {slides[currentIndex].text1}
        </h2>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {slides[currentIndex].text}
        </h1>

        {/* Button */}
        <button className="bg-white text-black px-6 py-3 text-sm font-semibold tracking-wide hover:bg-gray-200 transition">
          {slides[currentIndex].button}
        </button>
      </div>

    </div>
  );
};

export default Section1;