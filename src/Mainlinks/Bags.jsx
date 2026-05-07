import React, { useState } from "react";

const Bag_products = [
  {
    id: 1,
    name: "Summit Trek Backpack",
    category: "Travel",
    price: 129,
    image:
      "https://img.freepik.com/free-psd/durable-orange-gray-hiking-backpack-ideal-adventures_191095-90935.jpg?semt=ais_rp_50_assets&w=740&q=80",
  },
  {
    id: 2,
    name: "Explorer Orange Pack",
    category: "Travel",
    price: 99,
    image:
      "https://png.pngtree.com/png-vector/20241118/ourlarge/pngtree-orange-backpack-clipart-illustration-travel-adventure-hiking-camping-school-bag-gear-png-image_14481632.png",
  },
  {
    id: 3,
    name: "Urban Laptop Carry",
    category: "Laptop",
    price: 149,
    image:
      "https://tiimg.tistatic.com/fp/1/008/782/laptop-bagpacks-bags-919.jpg",
  },
  {
    id: 4,
    name: "Executive Pro Backpack",
    category: "Laptop",
    price: 179,
    image:
      "https://image.made-in-china.com/202f0j00OmblwLfnlqpT/Unisex-18-Inch-Youth-Large-Capacity-Waterproof-Laptop-Backpack-for-Business.jpg",
  },
  {
    id: 5,
    name: "Street Utility Pack",
    category: "Casual",
    price: 89,
    image:
      "https://i5.walmartimages.com/asr/c97987a0-c06f-47f3-b721-40c909bdc3ec.cfdf63bd101c92d97849927b7f58f223.jpeg",
  },
  {
    id: 6,
    name: "Shadow Green Tactical",
    category: "Travel",
    price: 159,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/8/537622086/LW/IU/TA/119770144/uzr-bagpacks-black-green-500x500.jpg",
  },
  {
    id: 7,
    name: "Carbon Utility Bag",
    category: "Casual",
    price: 139,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/8/537622188/HR/MG/DS/119770144/uzr-bagpacks-bags-black-gray.jpg",
  },
  {
    id: 8,
    name: "Metro Rolltop Pack",
    category: "Travel",
    price: 169,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQUrxARotO7k1E1Nm_6MunSAcy_nHC7wdRFw&s",
  },
  {
    id: 9,
    name: "Velocity Urban Carry",
    category: "Casual",
    price: 119,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQurVuBOuzzJXbtBcytmtpmybZgmRfUkG_WHA&s",
  },
  {
    id: 10,
    name: "Nomad Black Edition",
    category: "Laptop",
    price: 199,
    image:
      "https://5.imimg.com/data5/GO/UI/YR/SELLER-30545779/stylish-backpack-500x500.JPG",
  },
];

const Bags = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? Bag_products
      : Bag_products.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl font-semibold border-b mb-8 ">
            Bags
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 pb-8">
          {["All", "Travel", "Laptop", "Casual"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="mr-10 ml-10 uppercase font-semibold border-b border-transparent hover:border-black cursor-pointer transition"
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

export default Bags;