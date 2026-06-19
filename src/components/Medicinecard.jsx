import { useState } from "react";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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

export default function MedicineCard({ medicine }) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const FALLBACK = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80";

  const isPrescription = medicine.dosage?.toLowerCase().includes("prescribed") ||
    medicine.warning?.toLowerCase().includes("prescription");

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${
      isPrescription ? "border-red-200" : "border-slate-100"
    }`}>

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
        <img
          src={imgError ? FALLBACK : medicine.image}
          alt={medicine.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {medicine.type}
        </div>
        {/* Prescription badge */}
        {isPrescription && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Rx Only
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-base mb-1 leading-snug">{medicine.name}</h3>

        {/* Dosage */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 rounded-lg px-3 py-1.5 mb-3 w-fit">
          <ShieldIcon />
          {medicine.dosage}
        </div>

        {/* Benefit */}
        <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-emerald-300 pl-3 mb-3 flex-1">
          {medicine.benefit}
        </p>

        {/* Availability */}
        <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          {medicine.available}
        </div>

        {/* Warning toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center justify-between w-full text-xs font-semibold transition-colors pt-2 border-t ${
            isPrescription
              ? "border-red-100 text-red-500 hover:text-red-700"
              : "border-slate-100 text-amber-600 hover:text-amber-700"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <InfoIcon />
            Warning / Side Effects
          </span>
          <ChevronIcon open={expanded} />
        </button>

        {expanded && (
          <div className={`mt-2.5 text-xs leading-relaxed p-3 rounded-xl ${
            isPrescription ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
          }`}>
            ⚠️ {medicine.warning}
          </div>
        )}
      </div>
    </div>
  );
}