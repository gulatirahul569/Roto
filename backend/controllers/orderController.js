import Order from "../models/Order.js";
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      subtotal,
      shippingCharge,
      total,

      paymentMethod,
      paymentStatus,
      paymentId,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      userId: req.user._id,

      items,
      shippingAddress,
      subtotal,
      shippingCharge,
      total,

      // 🔥 ADD THESE (THIS IS THE FIX)
      paymentMethod: paymentMethod || "cod",
      paymentStatus: paymentStatus || "Pending",
      paymentId: paymentId || "",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* 🔵 GET ALL ORDERS (ADMIN) */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🟡 UPDATE ORDER STATUS (ADMIN) */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};