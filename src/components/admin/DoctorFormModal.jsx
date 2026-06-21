import { useState, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────
const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const BMI_CATS = ["Underweight", "Normal", "Overweight", "Obese"];

const EMPTY = {
  name:           "",
  specialist:     "",
  degree:         "",
  experience:     "",
  hospital:       "",
  location:       "",
  fee:            "",
  rating:         "5.0",
  totalReviews:   "0",
  availableTime:  "",
  about:          "",
  image:          "",
  availableDays:  [],
  specializations: "",
  bmiCategories:  [],
  languages:      "Bengali, English",
};

// ── Field ─────────────────────────────────────────────────────────
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

const inputCls = "w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 text-sm transition-colors";

// ── Checkbox group ────────────────────────────────────────────────
function CheckGroup({ options, selected, onChange, colorClass = "bg-[#77be0d]" }) {
  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter((v) => v !== val));
    else onChange([...selected, val]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 ${
            selected.includes(opt)
              ? `${colorClass} text-white border-transparent`
              : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
export default function DoctorFormModal({ doctor, onClose, onSave }) {
  const isEdit = !!doctor;
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (doctor) {
      setForm({
        ...doctor,
        specializations: Array.isArray(doctor.specializations)
          ? doctor.specializations.join(", ")
          : doctor.specializations || "",
        availableDays:  doctor.availableDays  || [],
        bmiCategories:  doctor.bmiCategories  || [],
        languages:      Array.isArray(doctor.languages)
          ? doctor.languages.join(", ")
          : doctor.languages || "Bengali, English",
        fee:          doctor.fee?.toString()          || "",
        rating:       doctor.rating?.toString()       || "5.0",
        totalReviews: doctor.totalReviews?.toString() || "0",
      });
    }
  }, [doctor]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim())       return setError("Doctor name is required.");
    if (!form.specialist.trim()) return setError("Specialist field is required.");
    if (!form.hospital.trim())   return setError("Hospital is required.");
    if (!form.fee)               return setError("Consultation fee is required.");
    if (form.availableDays.length === 0) return setError("Select at least one available day.");

    setLoading(true);
    try {
      await onSave({
        ...form,
        languages: typeof form.languages === "string"
          ? form.languages.split(",").map((s) => s.trim()).filter(Boolean)
          : form.languages,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-800">
            {isEdit ? "Edit Doctor" : "Add New Doctor"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          {/* Image */}
          <Field label="Profile Image URL">
            <input className={inputCls} value={form.image} onChange={set("image")} placeholder="https://images.unsplash.com/..." />
            {form.image && (
              <img src={form.image} alt="preview"
                className="mt-2 w-20 h-20 rounded-2xl object-cover object-top border border-slate-200"
                onError={(e) => { e.target.style.display = "none"; }} />
            )}
          </Field>

          {/* Name + Specialist */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" required>
              <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Dr. Ayesha Rahman" />
            </Field>
            <Field label="Specialist" required>
              <input className={inputCls} value={form.specialist} onChange={set("specialist")} placeholder="Nutritionist & Dietitian" />
            </Field>
          </div>

          {/* Degree + Experience */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Degree">
              <input className={inputCls} value={form.degree} onChange={set("degree")} placeholder="MBBS, MSc Nutrition" />
            </Field>
            <Field label="Experience">
              <input className={inputCls} value={form.experience} onChange={set("experience")} placeholder="12 years" />
            </Field>
          </div>

          {/* Hospital + Location */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Hospital" required>
              <input className={inputCls} value={form.hospital} onChange={set("hospital")} placeholder="Dhaka Medical College" />
            </Field>
            <Field label="Location">
              <input className={inputCls} value={form.location} onChange={set("location")} placeholder="Shahbag, Dhaka" />
            </Field>
          </div>

          {/* Fee + Rating + Reviews */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Fee (৳)" required>
              <input className={inputCls} type="number" value={form.fee} onChange={set("fee")} placeholder="800" />
            </Field>
            <Field label="Rating">
              <input className={inputCls} type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set("rating")} placeholder="4.9" />
            </Field>
            <Field label="Total Reviews">
              <input className={inputCls} type="number" value={form.totalReviews} onChange={set("totalReviews")} placeholder="312" />
            </Field>
          </div>

          {/* Available Time */}
          <Field label="Available Time">
            <input className={inputCls} value={form.availableTime} onChange={set("availableTime")} placeholder="10:00 AM – 3:00 PM" />
          </Field>

          {/* Available Days */}
          <Field label="Available Days" required>
            <CheckGroup
              options={DAYS}
              selected={form.availableDays}
              onChange={(val) => setForm((p) => ({ ...p, availableDays: val }))}
            />
          </Field>

          {/* BMI Categories */}
          <Field label="BMI Categories">
            <CheckGroup
              options={BMI_CATS}
              selected={form.bmiCategories}
              onChange={(val) => setForm((p) => ({ ...p, bmiCategories: val }))}
              colorClass="bg-blue-500"
            />
          </Field>

          {/* Specializations */}
          <Field label="Specializations (comma separated)">
            <input className={inputCls} value={form.specializations} onChange={set("specializations")} placeholder="Weight Management, Diabetes Diet, Clinical Nutrition" />
          </Field>

          {/* Languages */}
          <Field label="Languages (comma separated)">
            <input className={inputCls} value={form.languages} onChange={set("languages")} placeholder="Bengali, English" />
          </Field>

          {/* About */}
          <Field label="About Doctor">
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.about} onChange={set("about")} placeholder="Brief description about the doctor..." />
          </Field>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-2.5 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg transition-all">
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}