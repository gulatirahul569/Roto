import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // IMPORTANT: return raw object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// create new product

export const createProduct = async (req, res) => {
  try {
    console.log("📦 BODY RECEIVED:", req.body);

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.log("❌ CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};