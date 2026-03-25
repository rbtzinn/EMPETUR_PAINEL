export default function ControlRow({
  label,
  value,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-white p-3 shadow-sm">
      <span className="text-xs font-bold text-slate-600">{label}</span>

      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="h-7 w-7 rounded-full bg-slate-100 font-bold text-slate-700 transition-colors hover:bg-slate-200"
        >
          -
        </button>

        <span className="w-10 text-center text-xs font-black">{value}%</span>

        <button
          onClick={onIncrease}
          className="h-7 w-7 rounded-full bg-[#0B2341] font-bold text-white transition-colors hover:bg-[#00AEEF]"
        >
          +
        </button>
      </div>
    </div>
  );
}