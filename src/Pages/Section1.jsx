import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Section1 = () => {

  const navigate = useNavigate();

  const slides = [
    {
      img: "https://chromeindustries.com/cdn/shop/files/YearMonthDay_HP-MiniKadetReviews-Desktop_1.jpg?v=1777045669&width=2000",
      text1: "Top Rated for a Reason",
      text: "SIMPLE AND COMFORTABLE",
      button: "Get the Mini",
      align: "left",
      route: "/category/sling",
    },
    {
      img: "https://chromeindustries.com/cdn/shop/files/041526_Rim-homepage-Desktop-V2_1.jpg?v=1776289664&width=2000",
      text1: "Everyday Organizers",
      text: "WEAR IT, STASH IT",
      button: "Find Your Setup",
      align: "center",
      route: "/category/bags",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentIndex((prev) =>
        (prev + 1) % slides.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const currentSlide = slides[currentIndex];

  return (

    <div className="relative w-full overflow-hidden">

      {/* IMAGE */}
      <img
        src={currentSlide.img}
        alt=""
        className="w-full h-[80vh] object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className={`
            absolute inset-0
            flex flex-col justify-center
            text-white uppercase px-4
            ${
              currentSlide.align === "center"
                ? "items-center text-center"
                : "items-center text-center md:items-start md:text-left md:pl-20"
            }
          `}
        >

          {/* SMALL HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="text-sm md:text-base font-semibold mb-3 tracking-[4px] opacity-90"
          >
            {currentSlide.text1}
          </motion.h2>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="text-3xl md:text-6xl font-semiboldbold leading-tight mb-6"
          >
            {currentSlide.text}
          </motion.h1>

          {/* BUTTON */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            onClick={() => navigate(currentSlide.route)}
            className="
              bg-white
              text-black
              px-6
              py-3
              text-sm
              font-semibold
              tracking-wide
              hover:bg-gray-300
              cursor-pointer
            "
          >
            {currentSlide.button}
          </motion.button>

        </motion.div>

      </AnimatePresence>

    </div>

  );

};

export default Section1;