import { useState } from "react";

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-5-5-10-5-10zm0 13a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function FoodCard({ food }) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const FALLBACK = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80`;

  return (
    <div className=" rounded-2xl border border-slate-100 shadow-lg overflow-hidden  hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden ">
        <img
          src={imgError ? FALLBACK : food.image}
          alt={food.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        {/* Prep time badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          <ClockIcon />
          {food.prepTime}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Name */}
        <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug">
          {food.name}
        </h3>

        {/* Macros */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          <MacroBadge label="Calories" value={`${food.calories}`} unit="kcal" color="amber" />
          <MacroBadge label="Protein" value={food.protein} color="blue" />
          <MacroBadge label="Carbs"   value={food.carbs}   color="green" />
          <MacroBadge label="Fat"     value={food.fat}     color="pink" />
        </div>

        {/* Benefit */}
        <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-emerald-300 pl-3 mb-3 flex-1">
          {food.benefit}
        </p>

        {/* Expandable Ingredients */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors pt-2 border-t border-slate-100"
        >
          Ingredients ({food.ingredients.length})
          <ChevronIcon open={expanded} />
        </button>

        {expanded && (
          <ul className="mt-2.5 space-y-1">
            {food.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MacroBadge({ label, value, unit = "", color }) {
  const colors = {
    amber: "bg-amber-50 text-amber-700",
    blue:  "bg-blue-50  text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    pink:  "bg-pink-50  text-pink-700",
  };
  return (
    <div className={`rounded-xl px-2 py-1.5 text-center ${colors[color]}`}>
      <div className="text-xs font-bold leading-none">{value}{unit && <span className="font-normal text-[10px]"> {unit}</span>}</div>
      <div className="text-[10px] opacity-70 mt-0.5">{label}</div>
    </div>
  );
}