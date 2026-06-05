import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const AdminSettings = () => {
  const { token } = useAuth();

  const [settings, setSettings] = useState({
    storeName: "",
    shippingCharge: 0,
    taxPercent: 0,
    paymentCOD: true,
    paymentOnline: false,
  });

  const [loading, setLoading] = useState(false);

  // 🔹 LOAD SETTINGS (dummy for now)
  useEffect(() => {
    const stored = localStorage.getItem("adminSettings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 SAVE SETTINGS
  const handleSave = async () => {
    setLoading(true);

    try {
      // later connect to backend
      localStorage.setItem("adminSettings", JSON.stringify(settings));

      alert("Settings saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="text-gray-500">
          Configure your store settings
        </p>
      </div>

      {/* STORE SETTINGS */}
      <div className="bg-white p-5 rounded shadow space-y-4">

        <h2 className="font-bold">Store Settings</h2>

        <input
          name="storeName"
          value={settings.storeName}
          onChange={handleChange}
          placeholder="Store Name"
          className="w-full border p-2"
        />

      </div>

      {/* SHIPPING */}
      <div className="bg-white p-5 rounded shadow space-y-4">

        <h2 className="font-bold">Shipping</h2>

        <input
          type="number"
          name="shippingCharge"
          value={settings.shippingCharge}
          onChange={handleChange}
          placeholder="Shipping Charge"
          className="w-full border p-2"
        />

      </div>

      {/* TAX */}
      <div className="bg-white p-5 rounded shadow space-y-4">

        <h2 className="font-bold">Tax Settings</h2>

        <input
          type="number"
          name="taxPercent"
          value={settings.taxPercent}
          onChange={handleChange}
          placeholder="Tax %"
          className="w-full border p-2"
        />

      </div>

      {/* PAYMENT */}
      <div className="bg-white p-5 rounded shadow space-y-3">

        <h2 className="font-bold">Payment Methods</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="paymentCOD"
            checked={settings.paymentCOD}
            onChange={handleChange}
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="paymentOnline"
            checked={settings.paymentOnline}
            onChange={handleChange}
          />
          Online Payment
        </label>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-black text-white py-3 font-bold"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>

    </div>
  );
};

export default AdminSettings;