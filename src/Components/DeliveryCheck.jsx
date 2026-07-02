import React, { useState } from "react";
import { useLocation } from "../Context/LocationContext";

const DeliveryCheck = ({ product }) => {
  const { location } = useLocation();
  const [pincode, setPincode] = useState(location?.pincode || "");
  const [status, setStatus] = useState(null); // "available" | "unavailable" | "invalid"

  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setStatus("invalid");
      return;
    }

    const allowed = product.deliverablePincodes || [];

    // no restriction set on this product -> deliverable everywhere
    if (allowed.length === 0) {
      setStatus("available");
      return;
    }

    setStatus(allowed.includes(pincode) ? "available" : "unavailable");
  };

  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-4">
      <p className="text-sm font-medium mb-2">Check Delivery Availability</p>

      <div className="flex gap-2">
        <input
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setStatus(null);
          }}
          placeholder="Enter pincode"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
        />
        <button
          onClick={checkDelivery}
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          Check
        </button>
      </div>

      {status === "available" && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Delivery available in your area
        </p>
      )}
      {status === "unavailable" && (
        <p className="text-red-600 text-sm mt-2">
          ❌ Sorry, we don't deliver to this pincode yet
        </p>
      )}
      {status === "invalid" && (
        <p className="text-amber-600 text-sm mt-2">
          Please enter a valid 6-digit pincode
        </p>
      )}
    </div>
  );
};

export default DeliveryCheck;