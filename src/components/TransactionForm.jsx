import { useState } from "react";
import useTransaction from "../hooks/useTransaction";

const TransactionForm = ({ onSimulate, onLiveChange }) => {
  const { review } = useTransaction();
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [city, setCity] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);

  const pushLiveChange = (nextValues) => {
    if (onLiveChange) {
      onLiveChange(nextValues);
    }
  };

  const handleAmountChange = (e) => {
    const next = e.target.value;
    setAmount(next);
    pushLiveChange({ amount: next, merchant, timeStamp, city, deviceId });
  };

  const handleMerchantChange = (e) => {
    const next = e.target.value;
    setMerchant(next);
    pushLiveChange({ amount, merchant: next, timeStamp, city, deviceId });
  };

  const handleTimeStampChange = (e) => {
    const next = e.target.value;
    setTimeStamp(next);
    pushLiveChange({ amount, merchant, timeStamp: next, city, deviceId });
  };

  const handleCityChange = (e) => {
    const next = e.target.value;
    setCity(next);
    pushLiveChange({ amount, merchant, timeStamp, city: next, deviceId });
  };

  const handleDeviceIdChange = (e) => {
    const next = e.target.value;
    setDeviceId(next);
    pushLiveChange({ amount, merchant, timeStamp, city, deviceId: next });
  };

  const handleSubmit = async () => {
    const name = localStorage.getItem("finshield.username") || localStorage.getItem("name") || "";
    if (!name) {
      console.error("User name not found in localStorage");
      return;
    }
    if (!amount || !merchant || !timeStamp || !city || !deviceId) {
      alert("Fill all fields");
      return;
    }

    const data = {
      name,
      amount: Number(amount),
      merchant,
      timeStamp: timeStamp ? new Date(timeStamp).toISOString() : null,
      city,
      deviceId
    };

    try {
      setLoading(true);
      const response = await review(data);
      console.log("Review Response:", response);

      setAmount("");
      setMerchant("");
      setTimeStamp("");
      setCity("");
      setDeviceId("");
      if(onSimulate) {
        onSimulate(response);
      }
    } catch (error) {
      console.error("Error during review:", error);
    } finally {
      setLoading(false);
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
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            required
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Merchant Name</label>
          <input
            type="text"
            name="merchant"
            value={merchant}
            onChange={handleMerchantChange}
            placeholder="Enter merchant name"
            required
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Date & Time</label>
          <input
            type="datetime-local"
            name="timeStamp"
            value={timeStamp}
            onChange={handleTimeStampChange}
            required
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Location</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter location"
            required
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-white/60 text-xs">Device ID</label>
          <input
            type="text"
            name="deviceId"
            value={deviceId}
            onChange={handleDeviceIdChange}
            placeholder="Enter device ID"
            required
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="mt-4 py-2.5 rounded-lg
  bg-linear-to-r from-cyan-500 to-purple-500
  text-white font-medium
  shadow-[0_0_20px_rgba(168,85,247,0.4)]
  hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Simulate Transaction"}
        </button>

      </div>
    </div>
  );
};

export default TransactionForm;