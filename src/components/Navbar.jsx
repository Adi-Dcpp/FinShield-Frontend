import { useEffect, useState } from 'react';
import logo from '../assets/finshield-logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [showNameBox, setShowNameBox] = useState(false);
  const [username, setUsername] = useState('');
  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('finshield.username') || '';
    setUsername(savedName);
    setDraftName(savedName);
  }, []);

  const handleSaveName = () => {
    const cleaned = draftName.trim();
    localStorage.setItem('finshield.username', cleaned);
    setUsername(cleaned);
    setShowNameBox(false);
  };

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
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNameBox((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold hover:scale-105 transition"
            aria-label="Set user name"
          >
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </button>

          {showNameBox && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/15 bg-black/70 p-3 backdrop-blur-md">
              <p className="mb-2 text-[11px] uppercase tracking-wide text-white/60">User Name</p>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-2.5 py-2 text-sm text-white outline-none"
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="mt-2 w-full rounded-lg bg-linear-to-r from-cyan-500 to-purple-500 py-1.5 text-sm font-medium text-white"
              >
                Save
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;