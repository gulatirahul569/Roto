import React from "react";
import { Link } from "react-router-dom";
import { CiCircleChevRight } from "react-icons/ci";

const cards = [
  {
    title: "Sling",
    link: "/category/sling",
    img: "https://chromeindustries.com/cdn/shop/files/Kadet_Max_Steel_Blue_SQ_HP_1.jpg?v=1777073141&width=1200",
  },
  {
    title: "Gear up Deal",
    link: "/category/accessories",
    img: "https://chromeindustries.com/cdn/shop/files/HP_Accessories_sm_sq_2_1.jpg?v=1769108394&width=1200",
  },
  {
    title: "Pick It UP",
    link: "/category/bags",
    img: "https://chromeindustries.com/cdn/shop/files/hp_pack_it_up_20L_1.jpg?v=1777073743&width=1200",
  },
];

const Section2 = () => {
  return (
    <div className="flex flex-col">

      {/* Heading */}
      <div className="text-center font-semibold uppercase text-3xl md:text-4xl py-10">
        Made for What’s Ahead. Since 1995.
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-15 px-6 md:px-12 ">

        {cards.map((card, index) => (
          <Link
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            key={index}
            to={card.link}
            className="relative group overflow-hidden hover:opacity-90"
          >
            {/* Image */}
            <img
              src={card.img}
              alt={card.title}
              className="h-120 w-full object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Bottom Label */}
            <div className="absolute bottom-4 left-4 text-white  px-3 py-2">
              <span className="text-4xl font-semibold uppercase hover:opacity-100">
                {card.title}
              </span>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-50 right-43 opacity-0 group-hover:opacity-100 transition duration-300 hover:opacity-100">
              <div className=" p-1 rounded-full ">
                <CiCircleChevRight className="text-white text-7xl " />
              </div>
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
};

export default Section2;