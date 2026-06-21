import { useState } from "react";
import { useFoods } from "../../hooks/useFoods";
import FoodFormModal from "./FoodFormModal";
import Swal from "sweetalert2";

// ── Icons ─────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const SeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M12 22V12M12 12C12 12 7 9 4 4c5 0 8 3 8 8zM12 12c0 0 5-3 8-8-5 0-8 3-8 8z" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────
const CATEGORIES = ["All", "Underweight", "Normal", "Overweight", "Obese"];
const MEAL_TYPES = ["All", "breakfast", "lunch", "dinner", "snacks"];

const CATEGORY_STYLES = {
  Underweight: "bg-blue-100 text-blue-700",
  Normal:      "bg-emerald-100 text-emerald-700",
  Overweight:  "bg-amber-100 text-amber-700",
  Obese:       "bg-red-100 text-red-700",
};

const MEAL_EMOJIS = {
  breakfast: "🌅",
  lunch:     "🍽️",
  dinner:    "🌙",
  snacks:    "🫐",
};

// ── Food Row ──────────────────────────────────────────────────────
function FoodRow({ food, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
      {/* Image + Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            {food.image && !imgError ? (
              <img
                src={food.image}
                alt={food.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl">
                {MEAL_EMOJIS[food.mealType] || "🍽️"}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">{food.name}</p>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{food.benefit}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_STYLES[food.category] || "bg-slate-100 text-slate-600"}`}>
          {food.category}
        </span>
      </td>

      {/* Meal type */}
      <td className="px-4 py-3">
        <span className="text-sm capitalize text-slate-600">
          {MEAL_EMOJIS[food.mealType]} {food.mealType}
        </span>
      </td>

      {/* Macros */}
      <td className="px-4 py-3">
        <div className="flex gap-1 flex-wrap">
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{food.calories} kcal</span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{food.protein}</span>
        </div>
      </td>

      {/* Prep time */}
      <td className="px-4 py-3 text-xs text-slate-500">{food.prepTime}</td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(food)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#eaf3de] hover:text-[#77be0d] transition-colors"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(food)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Stats Card ────────────────────────────────────────────────────
function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminFoodManagement() {
  const { foods, loading, error, addFood, updateFood, deleteFood } = useFoods();

  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("All");
  const [mealFilter, setMealFilter] = useState("All");
  const [showModal, setShowModal]   = useState(false);
  const [editFood, setEditFood]     = useState(null);  // null = add mode

  // ── Filter ──────────────────────────────────────────────────────
  const filtered = foods.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch = f.name?.toLowerCase().includes(q) || f.benefit?.toLowerCase().includes(q);
    const matchCat    = catFilter  === "All" || f.category === catFilter;
    const matchMeal   = mealFilter === "All" || f.mealType === mealFilter;
    return matchSearch && matchCat && matchMeal;
  });

  // ── Stats ───────────────────────────────────────────────────────
  const stats = [
    { label: "Total Foods",   value: foods.length,                                                 color: "text-slate-800" },
    { label: "Underweight",   value: foods.filter((f) => f.category === "Underweight").length,     color: "text-blue-600" },
    { label: "Normal",        value: foods.filter((f) => f.category === "Normal").length,          color: "text-emerald-600" },
    { label: "Overweight",    value: foods.filter((f) => f.category === "Overweight").length,      color: "text-amber-600" },
    { label: "Obese",         value: foods.filter((f) => f.category === "Obese").length,           color: "text-red-600" },
  ];

  // ── Handlers ────────────────────────────────────────────────────
  const handleAdd = () => { setEditFood(null); setShowModal(true); };

  const handleEdit = (food) => { setEditFood(food); setShowModal(true); };

  const handleSave = async (formData) => {
    if (editFood) {
      await updateFood(editFood.id, formData);
      Swal.fire({ title: "Food updated!", icon: "success", timer: 1500, showConfirmButton: false });
    } else {
      await addFood(formData);
      Swal.fire({ title: "Food added!", icon: "success", timer: 1500, showConfirmButton: false });
    }
  };

  const handleDelete = (food) => {
    Swal.fire({
      title: "Delete this food?",
      html: `<strong>${food.name}</strong> will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFood(food.id);
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3 ">
        <div>
          <h2 className="text-xl font-black text-slate-800">Food Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Add, edit, and remove food items from all BMI categories</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all text-sm"
        >
          <PlusIcon /> Add New Food
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search food name or benefit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-sm transition-colors"
          />
        </div>

        {/* Category filter */}
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-sm font-medium bg-white text-slate-700 transition-colors"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Meal type filter */}
        <select
          value={mealFilter}
          onChange={(e) => setMealFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-sm font-medium bg-white text-slate-700 transition-colors capitalize"
        >
          {MEAL_TYPES.map((m) => <option key={m} value={m} className="capitalize">{m}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-3">
        Showing <strong className="text-slate-800">{filtered.length}</strong> of {foods.length} foods
      </p>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-10 h-10 border-4 border-[#77be0d] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading foods...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 text-sm">
          ⚠️ Error: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <p className="text-slate-400 text-lg font-bold mb-1">No foods found</p>
          <p className="text-slate-400 text-sm">
            {foods.length === 0
              ? 'Click "Add New Food" or run the seed script to get started.'
              : "Try adjusting your search or filters."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Food Item", "Category", "Meal Type", "Macros", "Prep Time", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((food) => (
                  <FoodRow
                    key={food.id}
                    food={food}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <FoodFormModal
          food={editFood}
          onClose={() => { setShowModal(false); setEditFood(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}