export default function ToggleCard({ ativo, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
        ativo
          ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-center text-xs font-bold">{label}</span>
    </button>
  );
}