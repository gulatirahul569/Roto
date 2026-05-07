import React, { useState } from "react";

const Sling_products = [
  {
    id: 1,
    name: "Urban Women Sling",
    category: "Casual",
    price: 79,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/sling-bag/8/i/w/women-sling-bag-trendy-designer-sling-bag-for-women-1-5-woman-original-imahff5hetxdrutz.jpeg?q=90",
  },
  {
    id: 2,
    name: "Elegance Mini Sling",
    category: "Casual",
    price: 89,
    image:
      "https://assets.myntassets.com/assets/images/2025/APRIL/9/6aooVbK4_0ccbe55b95144ab098a6e28ce0e4d78b.jpg",
  },
  {
    id: 3,
    name: "Trendy Designer Sling",
    category: "Casual",
    price: 69,
    image:
      "https://rukmini1.flixcart.com/image/1500/1500/xif0q/sling-bag/a/a/l/women-sling-bag-trendy-designer-sling-bag-for-women-1-5-woman-original-imahgvusp6xd3zxg.jpeg?q=70",
  },
  {
    id: 4,
    name: "Metro Leather Sling",
    category: "Premium",
    price: 149,
    image:
      "https://kxadmin.metroshoes.com/product/66-7249/660/66-7249LA44.jpg",
  },
  {
    id: 5,
    name: "Urban Street Sling",
    category: "Premium",
    price: 159,
    image:
      "https://kxadmin.metroshoes.com/product/66-7352/660/66-7352LA45.jpg",
  },
  {
    id: 6,
    name: "Lavie Purple Sling",
    category: "Casual",
    price: 99,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20240725/NsKt/66a2559d6f60443f31b366e3/-473Wx593H-700211247-purple-MODEL.jpg",
  },
  {
    id: 7,
    name: "Olive Daily Sling",
    category: "Casual",
    price: 95,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20240723/FrTs/669edc196f60443f319ad537/-473Wx593H-700211247-olive-MODEL.jpg",
  },
  {
    id: 8,
    name: "Classic Crossbody Bag",
    category: "Premium",
    price: 129,
    image:
      "https://m.media-amazon.com/images/I/81UuuIHGu4L._SL1500_.jpg",
  },
  {
    id: 9,
    name: "Lavie Navy Sling",
    category: "Casual",
    price: 109,
    image:
      "https://assets.myntassets.com/assets/images/22882608/2023/4/24/b33a76f8-8b46-447e-941f-769d096bf7ae1682345096284LavieNavyBlueEmbellishedStructuredSlingBag1.jpg",
  },
  {
    id: 10,
    name: "Minimal Everyday Sling",
    category: "Minimal",
    price: 59,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQilZzSZHTxunm_ew5gMdcO6uqhjS6JWqBCMQ&s",
  },
  {
    id: 11,
    name: "Brown Leather Cross Sling",
    category: "Premium",
    price: 169,
    image:
      "https://thebicyclist.in/cdn/shop/files/The_Bicyclist_Quilted_Mobile_Crossbody_Sling_Purse_Pouch_Bag_in_Brown_Leather_Beetle_4.webp?v=1741754788",
  },
  {
    id: 12,
    name: "Black Urban Sling",
    category: "Premium",
    price: 179,
    image:
      "https://cdn.shopify.com/s/files/1/0550/1229/4829/files/The_Bicyclist_Little_Crossbody_Sling_Pouch_in_Black_Leather_Beetle_4_260x.webp?v=1741754545",
  },
];

const Sling = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? Sling_products
      : Sling_products.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)] ">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl border-b mb-8 font-semibold">
            Slings
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 pb-8">
          {["All", "Casual", "Premium", "Minimal"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="uppercase mr-10 ml-10 font-semibold border-b border-transparent hover:border-black cursor-pointer transition"
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-95 object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-5">

              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold uppercase">
                  {product.name}
                </h2>

                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <p className="text-2xl font-black">
                  ${product.price}
                </p>

                <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                  Add
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Sling;