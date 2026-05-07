import React, { useState } from "react";

const Shoes_products = [
  {
    id: 1,
    name: "Urban White Sneaker",
    category: "Casual",
    price: 79,
    image: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: 2,
    name: "Classic Street Runner",
    category: "Casual",
    price: 89,
    image: "https://m.media-amazon.com/images/I/71n5QEuVe+L._AC_UY1000_.jpg",
  },
  {
    id: 3,
    name: "Minimal Trainer",
    category: "Casual",
    price: 69,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8mCrBItoSiqohB7C10P50phLTxFiUI45Omw&s",
  },
  {
    id: 4,
    name: "Floating Sneaker",
    category: "Casual",
    price: 99,
    image:
      "https://img.magnific.com/free-psd/floating-white-sneaker-minimalist-shoe-design_191095-80028.jpg",
  },
  {
    id: 5,
    name: "Sport Edge Runner",
    category: "Sports",
    price: 109,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2v5pyIVnS7eto0rZSaq6h6mv-tgDieLEPg&s",
  },
  {
    id: 6,
    name: "Athletic Pro",
    category: "Sports",
    price: 119,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEekBFcaIzOpXYk50LKVtqLZvhHGwvpt1LyQ&s",
  },
  {
    id: 7,
    name: "Modern Performance",
    category: "Sports",
    price: 129,
    image:
      "https://img.tatacliq.com/images/i24//437Wx649H/MP000000026706895_437Wx649H_202505220843163.jpeg",
  },
  {
    id: 8,
    name: "Urban Motion",
    category: "Casual",
    price: 95,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMGYUdARrfndUfPwyPrxuxnuHN_ohHuGqqA&s",
  },
  {
    id: 9,
    name: "City Walk Sneaker",
    category: "Casual",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    name: "Blue Sport Trainer",
    category: "Sports",
    price: 99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eRC8IMMbt9Qk_O4DqNoe2q6HsWQnfBR2jw&s",
  },
  {
    id: 11,
    name: "Minimal Runner",
    category: "Sports",
    price: 109,
    image:
      "https://img.freepik.com/free-vector/blue-tennis-shoes-sport-icon_18591-82518.jpg",
  },
  {
    id: 12,
    name: "Campus Vesper",
    category: "Casual",
    price: 89,
    image:
      "https://www.campusshoes.com/cdn/shop/files/VESPER_VESPER_WHT-NAVY_07.webp",
  },
  {
    id: 13,
    name: "Dynamic Runner Pro",
    category: "Sports",
    price: 139,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREg7TypaRQGn9s0tsGw9UT4KY0ACUTPEVBrQ&s",
  },
  {
    id: 14,
    name: "Adidas Walking Comfort",
    category: "Premium",
    price: 159,
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/Walking_34405e27a2.jpg",
  },
  {
    id: 15,
    name: "Elite Street Sneaker",
    category: "Premium",
    price: 179,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuChd3JgDqmmsaUddSyHQt8axlDbXz1bPXLA&s",
  },
  {
    id: 16,
    name: "Premium Urban Runner",
    category: "Premium",
    price: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BJQkd7rcHI2i-yRgszk_2sOHYwHKL10LfA&s",
  },
];

const Shoes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? Shoes_products
      : Shoes_products.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen">

      {/* Heading (same as Sling) */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl border-b mb-8 font-semibold">
            Shoes
          </h1>
        </div>

        {/* Filter Buttons (same style as Sling) */}
        <div className="flex justify-center gap-4 mb-8 pb-8">
          {["All", "Casual", "Sports", "Premium"].map((cat) => (
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

      {/* Product Grid (same as Sling) */}
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

export default Shoes;