import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    subtotal: Number,
    shippingCharge: Number,
    total: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "Pending", // Pending → Shipped → Delivered
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);