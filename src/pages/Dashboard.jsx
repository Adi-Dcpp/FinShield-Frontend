import FeatureCard from "../components/featureCard";

const DashBoard = () => {
  const features = [
    {
      title: "Transaction Simulation",
      desc: "Test payment flows with AI-driven risk scoring before approval.",
      icon: "📱",
      route: "/simulator",
    },
    {
      title: "Fraud Detection",
      desc: "Analyze suspicious messages and detect scam patterns instantly.",
      icon: "🛡️",
      route: "/fraud-detector",
    },
    {
      title: "History",
      desc: "Track all your previous checks and risk analysis logs.",
      icon: "🕒",
      route: "/history",
    },
  ];

 return (
  <div className="px-10 py-10">

    {/* Heading */}
    <div className="text-center mb-12">

      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text tracking-tight">
        FinShield
      </h1>

      <p className="text-cyan-400 mt-2 text-lg font-medium">
        Secure every payment decision
      </p>

     <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
  FinShield protects every transaction with intelligent risk analysis —
  <span className="text-cyan-400 font-medium"> because your money deserves more than trust.</span>
</p>
      <div className="h-[2px] w-40 mx-auto mt-4 
        bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
        blur-sm opacity-70" />

    </div>

    {/* 🔥 CARDS (THIS WAS MISSING) */}
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((item, index) => (
        <FeatureCard key={index} {...item} />
      ))}
    </div>

  </div>
);
};
export default DashBoard;