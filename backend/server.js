import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import AuthRoutes from "./routes/AuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/auth", AuthRoutes); // ✅ ADD THIS

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});