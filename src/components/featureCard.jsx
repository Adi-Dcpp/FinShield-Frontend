import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, desc, icon, route }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
      relative group
      bg-gradient-to-b from-white/10 via-white/5 to-transparent
      backdrop-blur-xl
      border border-white/10
      rounded-2xl p-6
      transition duration-300
      hover:scale-[1.03]
      hover:border-cyan-400/30
      hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]
      flex flex-col justify-between
      "
    >
      {/* Glow Effect */}
      <div
        className="
        absolute inset-0 rounded-2xl
        opacity-0 group-hover:opacity-100
        transition duration-500
        bg-[radial-gradient(400px_200px_at_50%_0%,rgba(34,211,238,0.15),transparent)]
        "
      />

      {/* Top Section */}
      <div className="relative z-10">
        <div
          className="
          text-4xl mb-4
          drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]
          group-hover:scale-110
          transition duration-300
          "
        >
          {icon}
        </div>

        <h2 className="text-white text-lg font-semibold">
          {title}
        </h2>

        <p className="text-white/60 text-sm mt-2">
          {desc}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="relative z-10 flex justify-between items-center mt-6">

        {/* Open Module (Primary) */}
        <button
          onClick={() => navigate(route)}
          className="
          px-4 py-2 text-sm rounded-lg
          bg-gradient-to-r from-cyan-400 to-blue-500
          text-black font-medium
          hover:scale-105
          transition
          "
        >
          Open Module →
        </button>

        {/* See Details (Secondary) */}
        <button
          className="
          px-3 py-2 text-sm rounded-lg
          border border-purple-400/30
          text-purple-300
          hover:bg-purple-500/10
          transition
          "
        >
          See Details →
        </button>

      </div>
    </div>
  );
};

export default FeatureCard;
  