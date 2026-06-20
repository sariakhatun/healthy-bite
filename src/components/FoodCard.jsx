import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toggleFavorite, isFavorite } from "../utils/favoritesStorage";

// ── Icons ─────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
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

// ── Macro Badge ───────────────────────────────────────────────────
function MacroBadge({ label, value, unit = "", color }) {
  const colors = {
    amber: "bg-amber-50 text-amber-700",
    blue:  "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    pink:  "bg-pink-50 text-pink-700",
  };
  return (
    <div className={`rounded-xl px-2 py-1.5 text-center ${colors[color]}`}>
      <div className="text-xs font-bold leading-none">
        {value}
        {unit && <span className="font-normal text-[10px]"> {unit}</span>}
      </div>
      <div className="text-[10px] opacity-70 mt-0.5">{label}</div>
    </div>
  );
}

// ── FoodCard ──────────────────────────────────────────────────────
export default function FoodCard({ food, onFavoriteChange }) {
  const { user } = useAuth();
  const email = user?.email;

  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fav, setFav]           = useState(() => isFavorite(email, food.id));
  const [favAnim, setFavAnim]   = useState(false);

  const FALLBACK = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80";

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!email) return;
    const { updated, added } = toggleFavorite(email, food);
    setFav(added);
    setFavAnim(true);
    setTimeout(() => setFavAnim(false), 300);
    // notify parent if needed (e.g. Favorites dashboard to update count)
    if (onFavoriteChange) onFavoriteChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
        <img
          src={imgError ? FALLBACK : food.image}
          alt={food.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />

        {/* Prep time */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          <ClockIcon />
          {food.prepTime}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          title={fav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
            fav
              ? "bg-red-500 text-white"
              : "bg-white/80 backdrop-blur-sm text-slate-400 hover:bg-white hover:text-red-400"
          } ${favAnim ? "scale-125" : "scale-100"}`}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">

        <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug">{food.name}</h3>

        {/* Macros */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          <MacroBadge label="Calories" value={food.calories} unit="kcal" color="amber" />
          <MacroBadge label="Protein"  value={food.protein}               color="blue"  />
          <MacroBadge label="Carbs"    value={food.carbs}                 color="green" />
          <MacroBadge label="Fat"      value={food.fat}                   color="pink"  />
        </div>

        {/* Benefit */}
        <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-[#77be0d] pl-3 mb-3 flex-1">
          {food.benefit}
        </p>

        {/* Ingredients toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-[#77be0d] transition-colors pt-2 border-t border-slate-100"
        >
          Ingredients ({food.ingredients.length})
          <ChevronIcon open={expanded} />
        </button>

        {expanded && (
          <ul className="mt-2.5 space-y-1">
            {food.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77be0d] flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}