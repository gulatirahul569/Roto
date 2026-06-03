import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    // MAIN ROUTING CATEGORY (bags, shoes, sling, accessories, new)
    newCategory: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // SUB FILTER CATEGORY (travel, laptop, casual etc)
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    subCategory: {
      type: String,
      lowercase: true,
      trim: true,
      default: "general",
    },

    description: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);