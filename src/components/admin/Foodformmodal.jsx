import { useState, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────
const CATEGORIES  = ["Underweight", "Normal", "Overweight", "Obese"];
const MEAL_TYPES  = ["breakfast", "lunch", "dinner", "snacks"];
const BMI_RANGES  = {
  Underweight: { min: 0,    max: 18.4 },
  Normal:      { min: 18.5, max: 24.9 },
  Overweight:  { min: 25,   max: 29.9 },
  Obese:       { min: 30,   max: 999  },
};

const EMPTY_FORM = {
  name:        "",
  category:    "Normal",
  mealType:    "breakfast",
  image:       "",
  calories:    "",
  protein:     "",
  carbs:       "",
  fat:         "",
  ingredients: "",   // comma-separated string in form, array in Firestore
  benefit:     "",
  prepTime:    "",
};

// ── Field component ───────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4  py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 text-sm transition-colors";

// ── Modal ─────────────────────────────────────────────────────────
export default function FoodFormModal({ food, onClose, onSave }) {
  const isEdit = !!food;
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Populate form when editing
  useEffect(() => {
    if (food) {
      setForm({
        ...food,
        ingredients: Array.isArray(food.ingredients)
          ? food.ingredients.join(", ")
          : food.ingredients || "",
        calories: food.calories?.toString() || "",
      });
    }
  }, [food]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name.trim())    return setError("Food name is required.");
    if (!form.calories)       return setError("Calories is required.");
    if (!form.benefit.trim()) return setError("Benefit description is required.");

    setLoading(true);
    try {
      await onSave({
        ...form,
        bmiRange: BMI_RANGES[form.category],
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white  rounded-3xl shadow-2xl w-full max-w-2xl my-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-800">
            {isEdit ? "Edit Food Item" : "Add New Food Item"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <XIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Row 1 — Name */}
          <Field label="Food Name" required>
            <input className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Grilled Chicken Salad" />
          </Field>

          {/* Row 2 — Category + Meal Type */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="BMI Category" required>
              <select className={inputCls} value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Meal Type" required>
              <select className={inputCls} value={form.mealType} onChange={set("mealType")}>
                {MEAL_TYPES.map((m) => <option key={m} value={m} className="capitalize">{m}</option>)}
              </select>
            </Field>
          </div>

          {/* Row 3 — Image URL */}
          <Field label="Image URL">
            <input className={inputCls} value={form.image} onChange={set("image")} placeholder="https://images.unsplash.com/..." />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 h-24 w-full object-cover rounded-xl border border-slate-200"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </Field>

          {/* Row 4 — Macros */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Field label="Calories" required>
              <input className={inputCls} type="number" value={form.calories} onChange={set("calories")} placeholder="520" />
            </Field>
            <Field label="Protein">
              <input className={inputCls} value={form.protein} onChange={set("protein")} placeholder="22g" />
            </Field>
            <Field label="Carbs">
              <input className={inputCls} value={form.carbs} onChange={set("carbs")} placeholder="60g" />
            </Field>
            <Field label="Fat">
              <input className={inputCls} value={form.fat} onChange={set("fat")} placeholder="20g" />
            </Field>
          </div>

          {/* Row 5 — Prep time */}
          <Field label="Prep Time">
            <input className={inputCls} value={form.prepTime} onChange={set("prepTime")} placeholder="10 min" />
          </Field>

          {/* Row 6 — Ingredients */}
          <Field label="Ingredients (comma separated)">
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              value={form.ingredients}
              onChange={set("ingredients")}
              placeholder="2 bananas, 2 eggs, 1 cup milk, honey"
            />
          </Field>

          {/* Row 7 — Benefit */}
          <Field label="Health Benefit" required>
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              value={form.benefit}
              onChange={set("benefit")}
              placeholder="Describe the health benefit of this food..."
            />
          </Field>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-2.5 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}