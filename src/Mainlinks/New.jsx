import React, { useState } from "react";

const NewFeatured_products = [
  // BAGS
  {
    id: 1,
    name: "Summit Trek Backpack",
    category: "Bag",
    tag: "New",
    price: 129,
    image:
      "https://img.freepik.com/free-psd/durable-orange-gray-hiking-backpack-ideal-adventures_191095-90935.jpg",
  },
  {
    id: 2,
    name: "Urban Laptop Carry",
    category: "Bag",
    tag: "Featured",
    price: 149,
    image:
      "https://tiimg.tistatic.com/fp/1/008/782/laptop-bagpacks-bags-919.jpg",
  },
  {
    id: 3,
    name: "Metro Rolltop Pack",
    category: "Bag",
    tag: "New",
    price: 169,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQUrxARotO7k1E1Nm_6MunSAcy_nHC7wdRFw&s",
  },

  // SHOES
  {
    id: 4,
    name: "Urban White Sneaker",
    category: "Shoes",
    tag: "New",
    price: 79,
    image: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: 5,
    name: "Adidas Walking Comfort",
    category: "Shoes",
    tag: "Featured",
    price: 159,
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/Walking_34405e27a2.jpg",
  },
  {
    id: 6,
    name: "Street Runner Pro",
    category: "Shoes",
    tag: "Featured",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },

  // SLINGS
  {
    id: 7,
    name: "Urban Women Sling",
    category: "Sling",
    tag: "New",
    price: 79,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/sling-bag/8/i/w/women-sling-bag-trendy-designer-sling-bag-for-women-1-5-woman-original-imahff5hetxdrutz.jpeg",
  },
  {
    id: 8,
    name: "Metro Leather Sling",
    category: "Sling",
    tag: "Featured",
    price: 149,
    image:
      "https://kxadmin.metroshoes.com/product/66-7249/660/66-7249LA44.jpg",
  },

  // ACCESSORIES
  {
    id: 9,
    name: "Minimal Wall Decor",
    category: "Accessories",
    tag: "New",
    price: 49,
    image:
      "https://ikiru.in/cdn/shop/files/37RhMt7DDAVq71nRkgEhJmfthYjj8slpen-V5g7LGLs.jpg",
  },
  {
    id: 10,
    name: "Luxury Wooden Lamp",
    category: "Accessories",
    tag: "New",
    price: 119,
    image:
      "https://images.woodenstreet.de/image/cache/data/amazon/amazon-new-shoot/YS6673-1W/New-Images/14-750x650.jpg",
  },
];

export { NewFeatured_products };

const NewFeatured = () => {
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? NewFeatured_products
      : NewFeatured_products.filter((item) => item.tag === filter);

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl font-semibold border-b mb-8">
            New Deals
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 pb-8">
          {["All", "New", "Featured"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className="uppercase mr-10 ml-10 font-semibold border-b border-transparent hover:border-black cursor-pointer transition"
            >
              {item}
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

export default NewFeatured;