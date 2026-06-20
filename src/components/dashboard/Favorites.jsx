/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getFavorites, removeFavorite } from "../../utils/favoritesStorage";

// ── Icons ─────────────────────────────────────────────────────────
const HeartIcon = ({ filled = true }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EmptyHeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-slate-300">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

// ── Macro badge ───────────────────────────────────────────────────
function Macro({ label, value, color }) {
  const colors = {
    amber: "bg-amber-50 text-amber-700",
    blue:  "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    pink:  "bg-pink-50 text-pink-700",
  };
  return (
    <div className={`rounded-lg px-2 py-1 text-center ${colors[color]}`}>
      <div className="text-xs font-bold">{value}</div>
      <div className="text-[10px] opacity-60">{label}</div>
    </div>
  );
}

// ── Filter tabs ───────────────────────────────────────────────────
const MEAL_TYPES = ["All", "breakfast", "lunch", "dinner", "snacks"];

// derive meal type from food id prefix
function getMealType(foodId = "") {
  if (foodId.includes("_b")) return "breakfast";
  if (foodId.includes("_l")) return "lunch";
  if (foodId.includes("_d")) return "dinner";
  if (foodId.includes("_s")) return "snacks";
  return "other";
}

// ── Favorite Food Card ────────────────────────────────────────────
function FavCard({ food, onRemove }) {
  const [imgError, setImgError] = useState(false);
  const [removing, setRemoving] = useState(false);

  const FALLBACK = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80";

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(food.id), 250);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex transition-all duration-250 ${
      removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
    }`}>
      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-slate-100">
        <img
          src={imgError ? FALLBACK : food.image}
          alt={food.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">{food.name}</h3>
            <button
              onClick={handleRemove}
              title="Remove from favorites"
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <TrashIcon />
            </button>
          </div>

          <p className="text-slate-400 text-xs mt-0.5 line-clamp-2 leading-relaxed">
            {food.benefit}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Macros mini */}
          <div className="flex gap-1">
            <Macro label="kcal"    value={food.calories} color="amber" />
            <Macro label="Protein" value={food.protein}  color="blue"  />
            <Macro label="Carbs"   value={food.carbs}    color="green" />
          </div>

          {/* Prep time */}
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <ClockIcon />
            {food.prepTime}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Favorites Component ──────────────────────────────────────
export default function Favorites() {
  const { user } = useAuth();
  const email = user?.email;

  const [favorites, setFavorites]   = useState([]);
  const [activeTab, setActiveTab]   = useState("All");
  const [successMsg, setSuccessMsg] = useState("");

  const refresh = useCallback(() => {
    setFavorites(getFavorites(email));
  }, [email]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRemove = (foodId) => {
    const updated = removeFavorite(email, foodId);
    setFavorites(updated);
    setSuccessMsg("Removed from favorites.");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleClearAll = () => {
    if (!window.confirm("Remove all favorites?")) return;
    localStorage.removeItem(`hb_favorites_${email}`);
    setFavorites([]);
    setSuccessMsg("All favorites cleared.");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  // Filter by meal type
  const filtered = activeTab === "All"
    ? favorites
    : favorites.filter((f) => getMealType(f.id) === activeTab);

  // Group by meal type for "All" view
  const grouped = MEAL_TYPES.slice(1).reduce((acc, type) => {
    const items = favorites.filter((f) => getMealType(f.id) === type);
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
            <HeartIcon />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">Favorites</h2>
            <p className="text-sm text-slate-500">
              {favorites.length === 0
                ? "No favorites saved yet"
                : `${favorites.length} food${favorites.length > 1 ? "s" : ""} saved`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl border-2 border-red-200 text-red-400 text-xs font-bold hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          )}
          <Link to="/foods">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all">
              Browse Foods
            </button>
          </Link>
        </div>
      </div>

      {/* Success toast */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4 text-sm text-emerald-700 font-medium">
          ✓ {successMsg}
        </div>
      )}

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <div className="flex justify-center mb-4 text-slate-300">
            <EmptyHeartIcon />
          </div>
          <h3 className="font-bold text-slate-700 text-lg mb-2">No Favorites Yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
            Tap the ❤️ heart icon on any food card to save it here for quick access.
          </p>
          <Link to="/foods">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold text-sm hover:opacity-90 transition">
              Browse Food Suggestions
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {MEAL_TYPES.map((tab) => {
              const count = tab === "All"
                ? favorites.length
                : favorites.filter((f) => getMealType(f.id) === tab).length;
              if (count === 0 && tab !== "All") return null;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-[#77be0d] hover:text-[#77be0d]"
                  }`}
                >
                  {tab}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === tab ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grouped "All" view */}
          {activeTab === "All" ? (
            <div className="space-y-8">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-slate-700 capitalize">
                      {type === "breakfast" && "🌅"}
                      {type === "lunch"     && "🍽️"}
                      {type === "dinner"    && "🌙"}
                      {type === "snacks"    && "🫐"}
                      {" "}{type}
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-xs text-slate-400">{items.length} saved</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {items.map((food) => (
                      <FavCard key={food.id} food={food} onRemove={handleRemove} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Single category view */
            <div className="grid grid-cols-1 gap-3">
              {filtered.length === 0 ? (
                <p className="text-center text-slate-400 py-10 text-sm">
                  No {activeTab} favorites saved.
                </p>
              ) : (
                filtered.map((food) => (
                  <FavCard key={food.id} food={food} onRemove={handleRemove} />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
