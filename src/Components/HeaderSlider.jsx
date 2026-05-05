import React from "react";

const HeaderSlider = () => {
  const messages = [
    "GEAR UP DEAL IS LIVE",
    ".",
    "FREE US SHIPPING ON ORDERS $110+",
    ".",
    "BUILT FOR EVERYDAY CARRY",
    ".",
    "GEAR UP DEAL IS LIVE",
    ".",
    "FREE US SHIPPING ON ORDERS $110+",
    ".",
    "BUILT FOR EVERYDAY CARRY",
    ".",
  ];

  return (
    <div className="bg-black text-white w-full overflow-hidden">

      {/* Animation styles inside component */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .marquee {
            display: flex;
            width: max-content;
            animation: marquee 50s linear infinite;
          }
        `}
      </style>

      <div className="marquee whitespace-nowrap">

        {/* Duplicate for infinite loop */}
        {[...messages, ...messages].map((msg, i) => (
          <span
            key={i}
            className="px-10 py-2 text-xs md:text-sm uppercase tracking-widest"
          >
            {msg}
          </span>
        ))}

      </div>

    </div>
  );
};

export default HeaderSlider;