/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import foodsData from "../data/foods.json";
import FoodCard from "../components/FoodCard";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import { useBMI } from "../context/BMIContext";

// ── Icons ─────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s1 5-3 5c-1 0-2-.5-2.5-1.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────
function getCategoryData(bmi) {
  return foodsData.find(
    (cat) => bmi >= cat.bmiRange.min && bmi <= cat.bmiRange.max
  );
}

function getAllMealsFlat(meals) {
  return Object.entries(meals).map(([type, items]) => ({ type, items }));
}

// ── Sub-components ────────────────────────────────────────────────
function MealSection({ type, items }) {
  const icons = {
    breakfast: <SunIcon />,
    lunch: <LeafIcon />,
    dinner: <MoonIcon />,
    snacks: <LeafIcon />,
  };
  const labels = {
    breakfast: "Breakfast",
    lunch:     "Lunch",
    dinner:    "Dinner",
    snacks:    "Snacks",
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#77be0dee]">{icons[type]}</span>
        <h3 className="text-base font-bold text-slate-700 uppercase tracking-wide">
          {labels[type]}
        </h3>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

function WeeklyPlan({ weeklyPlan, meals }) {
  // Build a flat lookup: id → meal name
  const lookup = {};
  Object.values(meals).forEach((items) =>
    items.forEach((m) => (lookup[m.id] = m.name))
  );

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
  const mealLabels = { breakfast: "🌅 Breakfast", lunch: "🍽️ Lunch", dinner: "🌙 Dinner", snack: "🫐 Snack" };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Day</th>
            {mealTypes.map((t) => (
              <th key={t} className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                {mealLabels[t]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeklyPlan.map((row, i) => (
            <tr
              key={row.day}
              className={`border-b border-slate-50 hover:bg-emerald-50/40 transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <td className="px-4 py-3 font-semibold text-slate-700">{row.day}</td>
              {mealTypes.map((t) => (
                <td key={t} className="px-4 py-3 text-slate-500 text-xs leading-snug">
                  {lookup[row[t]] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TipsAndAvoid({ tips, avoidFoods, warning }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Tips */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
        <h3 className="font-bold text-[#578e05ee] text-base mb-4">Health Tips</h3>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#538706ee]">
              <span className="w-5 h-5 rounded-full bg-[#b6e66fee] text-[#4d7a09ee] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Avoid */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <h3 className="font-bold text-red-800 text-base mb-4">Foods to Avoid</h3>
        <ul className="space-y-2.5">
          {avoidFoods.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-red-700">
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
        {warning && (
          <div className="mt-4 flex items-start gap-2 bg-red-100 rounded-xl p-3">
            <span className="text-red-600 flex-shrink-0 mt-0.5"><WarningIcon /></span>
            <p className="text-xs text-red-700 leading-relaxed font-medium">{warning}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── BMI Input Form ────────────────────────────────────────────────
function BMIForm({ onResult }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError]   = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight values.");
      return;
    }
    const bmi = parseFloat((w / (h * h)).toFixed(1));
    onResult(bmi);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 p-8 max-w-2xl mx-auto">
      <h2
        className="text-2xl font-black text-slate-800 mb-1"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Get Your Personal Food Plan
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Enter your height and weight — we'll calculate your BMI and show a tailored meal plan instantly.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
            Height (cm)
          </label>
          <input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="100"
            max="250"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:outline-none text-slate-800 font-medium transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
            Weight (kg)
          </label>
          <input
            type="number"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="20"
            max="300"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-400 focus:outline-none text-slate-800 font-medium transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#b2f351ee] to-[#77be0dee] text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4f4a3ee] transition-all whitespace-nowrap"
        >
          Show My Plan
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

// ── BMI Result Badge ──────────────────────────────────────────────
function BMIBadge({ bmi, categoryData, onReset }) {
  const categoryColors = {
    Underweight: "bg-blue-100 text-blue-800 border-blue-200",
    Normal:      "bg-emerald-100 text-emerald-800 border-emerald-200",
    Overweight:  "bg-amber-100 text-amber-800 border-amber-200",
    Obese:       "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-sm mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-3xl font-black text-slate-800">{bmi}</div>
        <div className="text-slate-400 font-light text-xl">BMI</div>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
            categoryColors[categoryData.category]
          }`}
        >
          {categoryData.category}
        </span>
        <span className="text-slate-500 text-sm">{categoryData.goal}</span>
        <span className="text-slate-400 text-sm">·</span>
        <span className="text-slate-500 text-sm font-medium">{categoryData.dailyCalories} / day</span>
      </div>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-slate-500 hover:text-emerald-600 underline underline-offset-2 transition-colors"
      >
        Recalculate
      </button>
    </div>
  );
}

// ── Tab Bar ───────────────────────────────────────────────────────
const TABS = [
  { id: "daily",   label: "Daily Plan",   icon: <LeafIcon /> },
  { id: "weekly",  label: "Weekly Plan",  icon: <CalendarIcon /> },
  { id: "tips",    label: "Tips & Avoid", icon: <SunIcon /> },
];

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-8 bg-white border border-slate-100 rounded-2xl p-1.5 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            active === tab.id
              ? "bg-gradient-to-r from-[#bced73ee] to-[#77be0dee] text-white shadow-md shadow-[#d2fa97ee]"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}


export default function FoodSuggestion() {
  const [activeTab, setTab] = useState("daily");
  const { user } = useAuth();
  const { bmi, saveBMI, resetBMI } = useBMI();


  const categoryData = useMemo(() => (bmi ? foodsData.find(
    (cat) => bmi >= cat.bmiRange.min && bmi <= cat.bmiRange.max
  ) : null), [bmi]);

  const mealSections = useMemo(
    () => (categoryData ? Object.entries(categoryData.meals).map(([type, items]) => ({ type, items })) : []),
    [categoryData]
  );

  const handleReset = () => {
    resetBMI();      // ✅ reset from context
    setTab("daily"); // reset tab
  };

  const handleBMIResult = (calculatedBMI) => {
    saveBMI(calculatedBMI); // ✅ save in context
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Please Login First</h2>
          <p className="text-slate-500 mb-6">
            You need to be logged in to calculate your BMI and get personalized food suggestions.
          </p>
          <Link to="/login">
            <button className="px-6 py-3 rounded-xl bg-[#77be0dee] text-white font-bold hover:bg-[#65a10bee] transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    );
  }


 return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-[#77be0dee] font-bold text-sm uppercase tracking-widest">
            BMI-Based Nutrition
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Food Suggestion
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            We analyze your BMI and create a fully personalized meal plan — breakfast, lunch, dinner, and snacks.
          </p>
        </div>

        {/* Show BMI Form if not calculated yet */}
        {!bmi && <BMIForm onResult={handleBMIResult} />}

        {/* Show results if BMI is calculated */}
        {bmi && categoryData && (
          <>
            <BMIBadge bmi={bmi} categoryData={categoryData} onReset={handleReset} />
            <TabBar active={activeTab} onChange={setTab} />

            {/* Daily Plan */}
            {activeTab === "daily" && mealSections.map(({ type, items }) => (
              <MealSection key={type} type={type} items={items} />
            ))}

            {/* Weekly Plan */}
            {activeTab === "weekly" && (
              <div>
                <p className="text-slate-500 text-sm mb-4">
                  A structured 7-day rotation based on your BMI category — {categoryData.category}.
                </p>
                <WeeklyPlan weeklyPlan={categoryData.weeklyPlan} meals={categoryData.meals} />
              </div>
            )}

            {/* Tips & Avoid */}
            {activeTab === "tips" && (
              <TipsAndAvoid
                tips={categoryData.tips}
                avoidFoods={categoryData.avoidFoods}
                warning={categoryData.warning}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}