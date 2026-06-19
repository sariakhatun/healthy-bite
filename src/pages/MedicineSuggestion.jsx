import { useState, useMemo } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useBMI } from "../context/BMIContext";
import medicinesData from "../data/medicines.json";
import MedicineCard from "../components/MedicineCard";
import ExerciseCard from "../components/ExerciseCard";

// ── Icons mita
const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v2" />
    <circle cx="17" cy="17" r="5" />
    <path d="M14 17h6" />
  </svg>
);

const DumbbellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M6 5v14M18 5v14M6 8h12M6 16h12M2 8h4M18 8h4M2 16h4M18 16h4" strokeLinecap="round" />
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 2H9l-1-2C6.5 13.5 5 11.5 5 9a7 7 0 017-7z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

// ── Tab config 
const TABS = [
  { id: "medicines", label: "Medicine Guide", icon: <PillIcon /> },
  { id: "exercises", label: "Exercise Plan",  icon: <DumbbellIcon /> },
  { id: "tips",      label: "Tips & Notes",   icon: <LightbulbIcon /> },
];

// ── BMI Form ──────────────────────────────────────────────────────
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
    onResult(parseFloat((w / (h * h)).toFixed(1)));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 p-8 max-w-2xl mx-auto">
      <h2
        className="text-2xl font-black text-slate-800 mb-1"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Get Your Medicine & Exercise Plan
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Enter your height and weight — we'll calculate your BMI and recommend the right supplements and exercises instantly.
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
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 font-medium transition-colors"
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
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 font-medium transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4f4a3] transition-all whitespace-nowrap"
        >
          Show My Plan
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// ── BMI Badge ─────────────────────────────────────────────────────
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
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${categoryColors[categoryData.category]}`}>
          {categoryData.category}
        </span>
        <span className="text-slate-500 text-sm">{categoryData.goal}</span>
      </div>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-slate-500 hover:text-[#77be0d] underline underline-offset-2 transition-colors"
      >
        Recalculate
      </button>
    </div>
  );
}

// ── Tab Bar ───────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-8 bg-white border border-slate-100 rounded-2xl p-1.5 w-fit flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            active === tab.id
              ? "bg-gradient-to-r from-[#bced73] to-[#77be0d] text-white shadow-md"
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

// ── Section Header ────────────────────────────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="text-[#77be0d]">{icon}</span>
      <h3 className="text-base font-bold text-slate-700 uppercase tracking-wide">{title}</h3>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

// ── Tips & Notes ──────────────────────────────────────────────────
function TipsAndNotes({ data }) {
  return (
    <div className="space-y-6">
      {/* Doctor Note */}
      {data.doctorNote && (
        <div className={`flex items-start gap-3 rounded-2xl p-5 border ${
          data.category === "Obese"
            ? "bg-red-50 border-red-200"
            : "bg-amber-50 border-amber-200"
        }`}>
          <span className={`flex-shrink-0 mt-0.5 ${
            data.category === "Obese" ? "text-red-500" : "text-amber-500"
          }`}>
            <WarningIcon />
          </span>
          <div>
            <p className={`text-sm font-bold mb-1 ${
              data.category === "Obese" ? "text-red-700" : "text-amber-700"
            }`}>
              Doctor's Note
            </p>
            <p className={`text-sm leading-relaxed ${
              data.category === "Obese" ? "text-red-600" : "text-amber-600"
            }`}>
              {data.doctorNote}
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Exercise Tips */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-bold text-blue-800 text-base mb-4 flex items-center gap-2">
            <DumbbellIcon /> Exercise Tips
          </h3>
          <ul className="space-y-3">
            {data.exerciseTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-blue-700">
                <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Medicine Tips */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h3 className="font-bold text-emerald-800 text-base mb-4 flex items-center gap-2">
            <PillIcon /> Supplement Tips
          </h3>
          <ul className="space-y-3">
            {data.medicineTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-emerald-700">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
const MedicineSuggestion = () => {
  const [activeTab, setTab] = useState("medicines");
  const { user } = useAuth();
  const { bmi, saveBMI, resetBMI } = useBMI();

  const categoryData = useMemo(
    () =>
      bmi
        ? medicinesData.find(
            (cat) => bmi >= cat.bmiRange.min && bmi <= cat.bmiRange.max
          )
        : null,
    [bmi]
  );

  const handleReset = () => {
    resetBMI();
    setTab("medicines");
  };

  // ── Not logged in ─────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#eaf3de] flex items-center justify-center mx-auto mb-4 text-[#77be0d]">
            <HeartIcon />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-800">Please Login First</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            You need to be logged in to get your personalized medicine and exercise recommendations.
          </p>
          <Link to="/login">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold hover:opacity-90 transition">
              Login to Continue
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
          <span className="text-[#77be0d] font-bold text-sm uppercase tracking-widest">
            BMI-Based Health Plan
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Medicine & Exercise
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Based on your BMI, we recommend the right supplements, exercises, and health tips — personalized just for you.
          </p>
        </div>

        {/* BMI Form — shown only if no BMI in context */}
        {!bmi && <BMIForm onResult={saveBMI} />}

        {/* Results */}
        {bmi && categoryData && (
          <>
            {/* Obese warning banner */}
            {categoryData.warning && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 mb-6">
                <span className="text-red-500 flex-shrink-0 mt-0.5">
                  <WarningIcon />
                </span>
                <p className="text-sm text-red-700 font-medium leading-relaxed">
                  {categoryData.warning}
                </p>
              </div>
            )}

            <BMIBadge bmi={bmi} categoryData={categoryData} onReset={handleReset} />
            <TabBar active={activeTab} onChange={setTab} />

            {/* Medicine Tab */}
            {activeTab === "medicines" && (
              <div>
                <SectionHeader icon={<PillIcon />} title="Recommended Supplements" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryData.medicines.map((med) => (
                    <MedicineCard key={med.id} medicine={med} />
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Tab */}
            {activeTab === "exercises" && (
              <div>
                <SectionHeader icon={<DumbbellIcon />} title="Recommended Exercises" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryData.exercises.map((ex) => (
                    <ExerciseCard key={ex.id} exercise={ex} />
                  ))}
                </div>
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === "tips" && (
              <TipsAndNotes data={categoryData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicineSuggestion;