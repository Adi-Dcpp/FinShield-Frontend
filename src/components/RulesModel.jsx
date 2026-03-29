const RulesModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="w-[400px] max-h-[80vh] overflow-y-auto
        rounded-2xl bg-white/5 border border-white/10
        p-6 text-white backdrop-blur-xl">

        <h2 className="text-lg font-semibold mb-4">
          Risk Calculation Rules
        </h2>

        <div className="text-xs space-y-3 text-white/70">

          <p>• High amount spike → +25</p>
          <p>• Very high amount (&gt; 100k) → +20</p>
          <p>• New device → +15</p>
          <p>• Unknown location → +10</p>
          <p>• Geo mismatch → +20</p>
          <p>• Unusual time (0–5 AM) → +10</p>
          <p>• Velocity burst → +20</p>
          <p>• Device + Geo combo → +10</p>
          <p>• Risky merchant → +10</p>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default RulesModal;