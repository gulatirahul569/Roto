import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Section1 = () => {
  const navigate = useNavigate();

  const slides = [
    {
      img: "https://chromeindustries.com/cdn/shop/files/YearMonthDay_HP-MiniKadetReviews-Desktop_1.jpg?v=1777045669&width=2000",
      imgMobile:
        "https://images.pexels.com/photos/37625744/pexels-photo-37625744.jpeg",
      text1: "Top Rated for a Reason",
      text: "SIMPLE AND COMFORTABLE",
      button: "Get the Mini",
      align: "left",
      route: "/category/sling",
    },
    {
      img: "https://chromeindustries.com/cdn/shop/files/041526_Rim-homepage-Desktop-V2_1.jpg?v=1776289664&width=2000",
      imgMobile:
        "https://images.pexels.com/photos/21390399/pexels-photo-21390399.jpeg",
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
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  // ✅ SINGLE ANIMATION (applies to all elements equally)
  const animation = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden">

      {/* IMAGE */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={currentSlide.imgMobile}
        />
        <img
          src={currentSlide.img}
          alt=""
          className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] object-cover"
        />
      </picture>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`
            absolute inset-0
            flex flex-col justify-center
            text-white uppercase px-4 sm:px-8 md:px-16
            ${currentSlide.align === "center"
              ? "items-center text-center"
              : "items-center text-center md:items-start md:text-left"
            }
          `}
        >

          {/* EVERYTHING USES SAME ANIMATION */}
          <motion.h2 variants={animation} className="text-[10px] sm:text-xs md:text-sm font-semibold mb-2 md:mb-3 tracking-[3px] md:tracking-[4px] opacity-90">
            {currentSlide.text1}
          </motion.h2>

          <motion.h1 variants={animation} className="text-2xl sm:text-4xl md:text-6xl font-semibold leading-tight mb-4 md:mb-6">
            {currentSlide.text}
          </motion.h1>

          <motion.button
            variants={animation}
            onClick={() => navigate(currentSlide.route)}
            className="
           bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide hover:bg-gray-300 transform-gpu
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