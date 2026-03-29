import { useState } from "react";

const TransactionForm = ({ onSimulate }) => {

  const [form, setForm] = useState({
    amount: 180000,
    merchant: "Crypto Wallet Transfer",
    city: "London",
    deviceId: "dev-new-123",
    timeStamp: "2026-03-27T01:15"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const response = {
      statusCode: 200,
      message: "review generated",
      data: {
        riskPoint: 100,
        riskFactors: [
          "HIGH_AMOUNT_SPIKE",
          "VERY_HIGH_AMOUNT",
          "NEW_DEVICE",
          "GEO_MISMATCH",
          "DEVICE_GEO_COMBO",
        ],
        decision: "BLOCK",
        explanation:
          "This transaction is considered high-risk due to a significant amount spike, high transaction value, and several other suspicious factors.",
        meta: {
          amount: 180000,
          deviceId: "dev-new-1774817444741",
          geoCountry: "GB",
          hour: 6,
          merchant: "Crypto Wallet Transfer",
          timestamp: "2026-03-27T01:15:00.000Z"
        }
      }
      ,
      success: true
    };

    if (onSimulate) {
      onSimulate(response);
    }
  };

  return (
    <div className="w-full max-w-md p-6 rounded-2xl
      bg-white/4 backdrop-blur-xl
      border border-white/10
      shadow-[0_0_40px_rgba(168,85,247,0.15)]">

      <div className="mb-6">
        <h2 className="text-white text-xl font-semibold">
          Transaction Inputs
        </h2>
        <p className="text-white/50 text-sm mt-1">
          Configure transaction details and fraud with AI
        </p>
      </div>

      <div className="flex flex-col gap-4">

        {/* (all your inputs unchanged) */}

        <div>
          <label className="text-white/60 text-xs">Amount (INR)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Merchant Name</label>
          <input
            type="text"
            name="merchant"
            value={form.merchant}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Date & Time</label>
          <input
            type="datetime-local"
            name="timeStamp"
            value={form.timeStamp}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Location</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Device ID</label>
          <input
            type="text"
            name="deviceId"
            value={form.deviceId}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        {/* 🔥 Button FIXED */}
        <button
          onClick={handleSubmit}
          className="mt-4 py-2.5 rounded-lg
          bg-linear-to-r from-cyan-500 to-purple-500
          text-white font-medium
          shadow-[0_0_20px_rgba(168,85,247,0.4)]
          hover:opacity-90 transition"
        >
          Simulate Transaction
        </button>

      </div>
    </div>
  );
};

export default TransactionForm;