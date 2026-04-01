const ReviewPhoneUI = ({ reviewData, onProceed, onDecline, loadingAction }) => {

  const {
    meta = {},
    riskPoint = 0,
    decision = "REVIEW",
    riskFactors = [],
    explanation = "",
  } = reviewData || {};

  // Determine risk level based on riskPoint
  const getRiskLevel = () => {
    if (riskPoint >= 70) return "HIGH_RISK";
    if (riskPoint >= 35) return "MEDIUM_RISK";
    return "LOW_RISK";
  };

  const riskLevel = getRiskLevel();

  const decisionColor =
    riskLevel === "HIGH_RISK"
      ? "text-red-400 bg-red-500/10 border-red-400/20"
      : riskLevel === "MEDIUM_RISK"
      ? "text-yellow-400 bg-yellow-500/10 border-yellow-400/20"
      : "text-green-400 bg-green-500/10 border-green-400/20";

  return (
    <div className="relative isolate h-205 w-100 max-w-[94vw] lg:max-w-none">
      <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[60px] bg-linear-to-b from-cyan-400/25 via-indigo-400/20 to-purple-500/24 blur-3xl" />

      <div className="relative h-full rounded-[56px] border border-white/35 bg-linear-to-b from-white/22 via-white/9 to-transparent p-3 shadow-[0_28px_80px_rgba(5,2,30,0.70)] backdrop-blur-xl">
        <span className="absolute -left-0.75 top-40 h-16 w-0.75 rounded-l-full bg-white/45" />
        <span className="absolute -left-0.75 top-58 h-24 w-0.75 rounded-l-full bg-white/30" />
        <span className="absolute -right-0.75 top-48 h-28 w-0.75 rounded-r-full bg-white/40" />

        <div className="relative h-full overflow-hidden rounded-[48px] border border-white/18 bg-linear-to-b from-indigo-950/42 via-slate-950/24 to-purple-950/30 backdrop-blur-2xl">
          <div className="absolute left-1/2 top-2.5 z-20 h-8 w-40 -translate-x-1/2 rounded-full border border-white/20 bg-black/45 backdrop-blur-md">
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800 ring-1 ring-white/30" />
          </div>

          <div className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/45" />

          <div className="absolute inset-0 z-0 bg-[radial-gradient(560px_340px_at_16%_14%,rgba(56,189,248,0.22),transparent_68%),radial-gradient(560px_400px_at_88%_20%,rgba(168,85,247,0.25),transparent_70%),radial-gradient(450px_300px_at_50%_78%,rgba(99,102,241,0.22),transparent_75%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-white/8 via-transparent to-white/4" />

          <div className="relative z-10 flex h-full flex-col justify-between px-7 pb-8 pt-16 text-white">

          {/* 🔹 Header */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/85">Payment Review</p>
            <h2 className="text-lg font-semibold mt-1 leading-tight">
              {meta.merchant}
            </h2>

            <p className="text-xs text-white/40 mt-1">
              {new Date(meta.timestamp).toLocaleString()}
            </p>
          </div>

          {/* 💰 Amount */}
          <div className="text-center mt-2">
            <p className="text-3xl font-semibold leading-none">
              ₹{Number(meta.amount ?? 0).toLocaleString()}
            </p>
          </div>

          {/* 🚨 Risk Score */}
          <div className="text-center mt-1 rounded-2xl border border-white/14 bg-black/20 py-3">
            <p className="text-xs text-white/50">RISK SCORE</p>

            <h1 className="text-4xl font-bold mt-1 text-red-400">
              {riskPoint}
            </h1>

            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${decisionColor}`}>
              {riskLevel}
            </span>
          </div>

          {/* ⚠️ Risk Factors */}
          <div className="mt-1">
            <p className="text-xs text-white/50 mb-2">Risk Factors</p>

            <div className="flex flex-wrap gap-2">
              {riskFactors.map((factor, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>

          {/* 📄 Explanation */}
          <div className="text-xs text-white/60 mt-1 leading-relaxed line-clamp-3">
            {explanation}
          </div>

          {/* 🔘 Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              className="flex-1 py-2 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed
              bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
              onClick={onProceed}
              disabled={loadingAction !== null}>
              {loadingAction === "proceed" ? "Processing..." : "Proceed"}
            </button>

            <button
              className="flex-1 py-2 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed
              bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
              onClick={onDecline}
              disabled={loadingAction !== null}>
              {loadingAction === "decline" ? "Processing..." : "Decline"}
            </button>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ReviewPhoneUI;