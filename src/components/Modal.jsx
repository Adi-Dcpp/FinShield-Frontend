export default function Modal({ isOpen, onClose, title, points }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      
      <div className="bg-[#0f172a] text-white p-6 rounded-xl w-[400px] border border-white/10">
        
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-white/80">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-5 px-4 py-2 bg-cyan-500 text-black rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}