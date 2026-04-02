import { useMemo, useState } from "react";

const DECISION_BADGE_CLASS = {
  APPROVE: "bg-green-500/20 text-green-400",
  REVIEW: "bg-yellow-500/20 text-yellow-400",
  BLOCK: "bg-red-500/20 text-red-400",
  LOW_RISK: "bg-emerald-500/20 text-emerald-300",
  HIGH_RISK: "bg-orange-500/20 text-orange-300"
};

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount || 0);
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "-";
  }

  return new Date(timestamp).toLocaleString();
}

function Card({ title, value, tone = "text-white" }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 ${tone}`}>
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

export default function HistoryTab({ transactions = [] }) {
  const [filter, setFilter] = useState("ALL");
  const gridTemplateColumns =
    "minmax(180px, 1.15fr) 110px 110px 150px 80px minmax(240px, 1.6fr) 180px 80px 180px";

  const decisionOptions = useMemo(() => {
    const options = new Set(["ALL"]);

    transactions.forEach((item) => {
      if (item.decision) {
        options.add(item.decision);
      }
    });

    return [...options];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filter === "ALL") {
      return transactions;
    }

    return transactions.filter((item) => item.decision === filter);
  }, [filter, transactions]);

  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter((item) => item.status === "SUCCESS").length;
  const failedTransactions = transactions.filter((item) => item.status === "FAILED").length;
  const highRiskTransactions = transactions.filter((item) => item.riskPoint >= 70).length;

  return (
    <div className="h-[calc(100vh-1rem)] overflow-hidden p-4 text-white sm:p-6">
      <div className="flex h-full min-h-0 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <h1 className="mb-6 text-3xl font-bold text-white/95">Transaction History</h1>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card title="Total" value={totalTransactions} />
          <Card title="Success" value={successfulTransactions} tone="text-green-400" />
          <Card title="Failed" value={failedTransactions} tone="text-red-400" />
          <Card title="High Risk (70+)" value={highRiskTransactions} tone="text-orange-300" />
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {decisionOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-4 py-1 text-sm ${
                filter === option
                  ? "bg-cyan-500 text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="grid border-b border-white/10 bg-white/10 text-left text-white/95" style={{ gridTemplateColumns }}>
            <div className="px-4 py-4 font-medium">Merchant</div>
            <div className="px-4 py-4 font-medium">Amount</div>
            <div className="px-4 py-4 font-medium">Status</div>
            <div className="px-4 py-4 font-medium">Decision</div>
            <div className="px-4 py-4 font-medium">Risk</div>
            <div className="px-4 py-4 font-medium">Risk Factors</div>
            <div className="px-4 py-4 font-medium">Device</div>
            <div className="px-4 py-4 font-medium">Country</div>
            <div className="px-4 py-4 font-medium">Timestamp</div>
          </div>

          <div className="h-full min-h-0 overflow-auto">
            <div style={{ minWidth: 1200 }}>
              {filteredTransactions.map((item) => (
                <div
                  key={item._id}
                  className={`grid items-center border-t border-white/10 transition hover:bg-white/5 ${
                    item.riskPoint >= 70 ? "bg-red-500/10" : ""
                  }`}
                  style={{ gridTemplateColumns }}
                >
                  <div className="px-4 py-4">{item.merchant || "-"}</div>
                  <div className="px-4 py-4">{formatAmount(item.amount)}</div>
                  <div className="px-4 py-4">{item.status || "-"}</div>
                  <div className="px-4 py-4">
                    <span
                      className={`rounded px-2 py-1 text-sm ${
                        DECISION_BADGE_CLASS[item.decision] || "bg-slate-500/20 text-slate-200"
                      }`}
                    >
                      {item.decision || "UNKNOWN"}
                    </span>
                  </div>
                  <div className="px-4 py-4">{item.riskPoint ?? "-"}</div>
                  <div className="px-4 py-4">
                    {item.riskFactors?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {item.riskFactors.map((factor) => (
                          <span
                            key={`${item._id}-${factor}`}
                            className="rounded bg-red-500/20 px-2 py-1 text-xs"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="px-4 py-4">{item.deviceId || "-"}</div>
                  <div className="px-4 py-4">{item.geoCountry || "-"}</div>
                  <div className="px-4 py-4 whitespace-nowrap">{formatTimestamp(item.timestamp)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
