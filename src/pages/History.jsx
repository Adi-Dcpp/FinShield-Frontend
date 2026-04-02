
import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/transactions/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Filter logic
  const filteredData =
    filter === "ALL"
      ? data
      : data.filter(item => item.decision === filter);

  // 🔥 Stats
  const total = data.length;
  const approved = data.filter(d => d.decision === "APPROVE").length;
  const review = data.filter(d => d.decision === "REVIEW").length;
  const blocked = data.filter(d => d.decision === "BLOCK").length;

  return (
    <div className="p-6 text-white">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total" value={total} />
        <Card title="Approved" value={approved} green />
        <Card title="Review" value={review} yellow />
        <Card title="Blocked" value={blocked} red />
      </div>

      {/* 🔥 FILTERS */}
      <div className="flex gap-3 mb-6">
        {["ALL", "APPROVE", "REVIEW", "BLOCK"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm ${
              filter === f
                ? "bg-cyan-500 text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🔥 TABLE */}
      <div className="overflow-x-auto backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
        <table className="w-full text-left">

          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Merchant</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Decision</th>
              <th className="p-3">Risk</th>
              <th className="p-3">Factors</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(item => (
              <tr
                key={item._id}
                className={`border-t border-white/10 transition hover:bg-white/5 ${
                  item.riskPoint > 70 ? "bg-red-500/10" : ""
                }`}
              >
                <td className="p-3">{item.merchant}</td>

                <td className="p-3">₹{item.amount}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.decision === "APPROVE"
                      ? "bg-green-500/20 text-green-400"
                      : item.decision === "REVIEW"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {item.decision}
                  </span>
                </td>

                <td className="p-3">{item.riskPoint}</td>

                {/* 🔥 RISK FACTORS */}
                <td className="p-3">
                  {item.riskFactors.length === 0
                    ? "-"
                    : item.riskFactors.map((f, i) => (
                        <span
                          key={i}
                          className="text-xs bg-red-500/20 px-2 py-1 mr-1 rounded"
                        >
                          {f}
                        </span>
                      ))}
                </td>

                <td className="p-3">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

// 🔥 CARD COMPONENT
function Card({ title, value, green, yellow, red }) {
  return (
    <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${
      green ? "text-green-400" :
      yellow ? "text-yellow-400" :
      red ? "text-red-400" : "text-white"
    }`}>
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}