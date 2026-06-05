import express from "express";

import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* USER */
router.post("/", protect, createOrder);

/* ADMIN */
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;