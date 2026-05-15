import React from "react";
import { motion } from "framer-motion";

const Section4 = () => {
  return (

    <div className="relative w-full h-130  overflow-hidden">

      {/* VIDEO */}
      <motion.video
        src="/section4.mp4"
        autoPlay
        muted
        loop
        playsInline
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-full h-full object-cover"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30"></div>

     

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">

        <div className="max-w-7xl mx-auto w-full px-8 md:px-16">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >

            {/* SMALL TAG */}
            <p className="uppercase tracking-[6px] text-white/60 text-xs mb-5">
              Premium Collection 2026
            </p>

            {/* BIG HEADING */}
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">
              Elevate
              <br />
              Your Style
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-white/70 text-sm md:text-lg leading-relaxed max-w-xl">
              Discover premium bags, sneakers, and accessories
              crafted for modern streetwear and luxury lifestyle.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

              

            </div>

          </motion.div>

        </div>

      </div>

      {/* FLOATING STATS */}
      <div className="absolute bottom-10 right-10 hidden lg:flex gap-5">

        <div className="backdrop-blur-md bg-white/10 border border-white/10 px-8 py-5 text-white">
          <h2 className="text-3xl font-bold">10K+</h2>
          <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
            Customers
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/10 px-8 py-5 text-white">
          <h2 className="text-3xl font-bold">250+</h2>
          <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
            Premium Products
          </p>
        </div>

      </div>

    </div>

  );
};

export default Section4;