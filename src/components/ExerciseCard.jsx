import { useState } from "react";

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2c0 0-5.5 4.5-5.5 9.5a5.5 5.5 0 0011 0C17.5 6.5 12 2 12 2zm0 13a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const INTENSITY_STYLES = {
  "Low":            "bg-emerald-100 text-emerald-700",
  "Low–Moderate":   "bg-teal-100 text-teal-700",
  "Moderate":       "bg-amber-100 text-amber-700",
  "Moderate–High":  "bg-orange-100 text-orange-700",
  "High":           "bg-red-100 text-red-700",
  "Very Low":       "bg-slate-100 text-slate-600",
};

export default function ExerciseCard({ exercise }) {
  const [imgError, setImgError] = useState(false);
  const FALLBACK = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
        <img
          src={imgError ? FALLBACK : exercise.image}
          alt={exercise.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        {/* Intensity badge */}
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
          INTENSITY_STYLES[exercise.intensity] || "bg-slate-100 text-slate-600"
        }`}>
          {exercise.intensity}
        </div>
        {/* Type badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {exercise.type}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug">{exercise.name}</h3>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <StatBadge icon={<ClockIcon />} label="Duration" value={exercise.duration} color="blue" />
          <StatBadge icon={<RepeatIcon />} label="Frequency" value={exercise.frequency} color="purple" />
          <StatBadge icon={<FlameIcon />} label="Burns" value={exercise.calories} color="orange" />
        </div>

        {/* Benefit */}
        <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-teal-300 pl-3 mb-3 flex-1">
          {exercise.benefit}
        </p>

        {/* Equipment */}
        <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-100">
          <span>🏋️</span>
          {exercise.equipment}
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon, label, value, color }) {
  const colors = {
    blue:   "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };
  return (
    <div className={`rounded-xl p-2 text-center ${colors[color]}`}>
      <div className="flex items-center justify-center gap-1 mb-0.5">{icon}</div>
      <div className="text-[10px] opacity-60 mb-0.5">{label}</div>
      <div className="text-[10px] font-bold leading-tight">{value}</div>
    </div>
  );
}