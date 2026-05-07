import React, { useState } from "react";

const Accessories_products = [
  {
    id: 1,
    name: "Minimal Wall Decor Piece",
    category: "Decor",
    price: 49,
    image:
      "https://ikiru.in/cdn/shop/files/37RhMt7DDAVq71nRkgEhJmfthYjj8slpen-V5g7LGLs.jpg?v=1756805933&width=1500",
  },
  {
    id: 2,
    name: "Golden Table Accent",
    category: "Decor",
    price: 59,
    image:
      "https://cdn.moolwan.com/394e500c-c21d-4305-8994-2b24f6008add.webp",
  },
  {
    id: 3,
    name: "Wooden Home Decor Set",
    category: "Decor",
    price: 79,
    image:
      "https://assets-news.housing.com/news/wp-content/uploads/2024/06/23232621/Popular-wooden-home-decor-items-in-2024-12.jpg",
  },
  {
    id: 4,
    name: "Modern Accent Sculpture",
    category: "Decor",
    price: 69,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZLg_iSBOyCDiFPtRZahYfYCuuYgrvIBAN-w&s",
  },
  {
    id: 5,
    name: "Aesthetic Home Figurine",
    category: "Decor",
    price: 89,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwiUNGyZQ4jEgrpa2_TlODmiMjldAKEKO4A&s",
  },
  {
    id: 6,
    name: "Premium Wooden Lamp",
    category: "Premium",
    price: 119,
    image:
      "https://images.woodenstreet.de/image/cache/data/amazon/amazon-new-shoot/YS6673-1W/New-Images/14-750x650.jpg",
  },
  {
    id: 7,
    name: "Luxury Decor Vase",
    category: "Premium",
    price: 149,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Fmo-hMY7fyugdXCOBuaNobPATLUYSAuTzA&s",
  },
  {
    id: 8,
    name: "Designer Wall Piece",
    category: "Premium",
    price: 159,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjOf91GAlOltbDwH3yaHnmr-TBudit0lw0-g&s",
  },
  {
    id: 9,
    name: "Modern Desk Decor",
    category: "Casual",
    price: 39,
    image:
      "https://images.jdmagicbox.com/v2/comp/def_content/ncat_id/home-decorative-item-94u4vt2-250.jpg",
  },
  {
    id: 10,
    name: "Minimal Table Ornament",
    category: "Casual",
    price: 29,
    image:
      "https://www.dekorcompany.com/cdn/shop/files/DEKO0809.png?v=1772107643",
  },
  {
    id: 11,
    name: "Classic Decorative Bowl",
    category: "Casual",
    price: 45,
    image:
      "https://m.media-amazon.com/images/I/618lfPDCbyL.jpg",
  },
  {
    id: 12,
    name: "Silver Moon Pendant",
    category: "Premium",
    price: 99,
    image:
      "https://image.made-in-china.com/2f0j00bnHkacSPgYoT/Jade-Angel-S925-Silver-Moon-Pendant-Simple-and-Fashionable-Single-Item-Accessories.webp",
  },
  {
    id: 13,
    name: "Elegant Wall Hanging",
    category: "Decor",
    price: 55,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1iL9nZfSCXcyx7hCDhycFFqNjtzlXxCUcEg&s",
  },
  {
    id: 14,
    name: "Boho Style Decor Piece",
    category: "Decor",
    price: 75,
    image:
      "https://m.media-amazon.com/images/I/61iKvZes5sL._AC_UY1100_.jpg",
  },
  {
    id: 15,
    name: "Artistic Table Decor",
    category: "Casual",
    price: 35,
    image:
      "https://i.pinimg.com/736x/5d/31/ba/5d31ba0ade7c08bc5eb0887cfabfd28b.jpg",
  },
];

const Accessories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? Accessories_products
      : Accessories_products.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl font-semibold border-b mb-8">
            Accessories
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 pb-8">
          {["All", "Casual", "Premium", "Decor"].map((cat) => (
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

export default Accessories;