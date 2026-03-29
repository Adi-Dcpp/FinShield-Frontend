import logo from '../assets/finshield-logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const tabs = [
    { name: "Dashboard", path: "/" },
    { name: "Simulator", path: "/simulator" },
    { name: "Fraud Detection", path: "/fraud-detector" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50
      backdrop-blur-sm bg-black/5 border-b border-white/10">

      <div className="flex items-center justify-between px-10 py-2">

        {/* 🔹 LEFT */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="FinShield" className="w-9 h-9" />
          <span className="text-white text-sm font-semibold tracking-wide">
            FinShield
          </span>
        </div>

        {/* 🔥 CENTER NAV */}
        <div className="flex items-center gap-5">

          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  
                  ${isActive
                    ? "text-white border border-white/30 bg-white/10"
                    : "text-white/60 border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                  }
                `}
              >
                {tab.name}
              </Link>
            );
          })}

        </div>

        {/* 💜 RIGHT */}
        <div className="w-8 h-8 rounded-full 
          bg-linear-to-r from-cyan-400 to-purple-500 
          flex items-center justify-center text-white text-xs font-semibold
          hover:scale-105 transition">
          U
        </div>

      </div>
    </nav>
  );
};

export default Navbar;