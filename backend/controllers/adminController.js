import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    const allOrders = await Order.find();

    // Revenue
    const revenue = allOrders.reduce((acc, order) => acc + order.total, 0);

    // Status counts
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const shippedOrders = await Order.countDocuments({ status: "Shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    // Top products (simple version)
    const productMap = {};

    allOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productMap[item.name]) {
          productMap[item.name] = 0;
        }
        productMap[item.name] += item.price * item.quantity;
      });
    });

    const topProducts = Object.keys(productMap)
      .map((name) => ({
        name,
        sales: productMap[name],
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    res.json({
      products,
      orders,
      users,
      revenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      topProducts,
      recentOrders: allOrders.slice(-5).reverse(),
      revenueChart: [
        { month: "Jan", revenue: 0 },
        { month: "Feb", revenue: 0 },
        { month: "Mar", revenue: revenue },
      ],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};