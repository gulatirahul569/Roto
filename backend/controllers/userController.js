import User from "../models/User.js";
import Order from "../models/Order.js";

// GET ALL USERS (ADMIN)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    // attach order count
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({ userId: user._id });
        return {
          ...user._doc,
          orderCount,
        };
      })
    );

    res.json(usersWithOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};