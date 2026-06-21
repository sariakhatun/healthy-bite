import { useState } from "react";
import { useDoctors } from "../../hooks/useDoctors";
import DoctorFormModal from "./DoctorFormModal";
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
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Doctor Row ────────────────────────────────────────────────────
function DoctorRow({ doctor, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
      {/* Image + Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            {doctor.image && !imgError ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl">👨‍⚕️</div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">{doctor.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{doctor.degree}</p>
          </div>
        </div>
      </td>

      {/* Specialist */}
      <td className="px-4 py-3">
        <p className="text-sm text-[#77be0d] font-semibold">{doctor.specialist}</p>
        <p className="text-xs text-slate-400 mt-0.5">{doctor.experience} exp.</p>
      </td>

      {/* Hospital */}
      <td className="px-4 py-3">
        <p className="text-sm text-slate-600">{doctor.hospital}</p>
        <p className="text-xs text-slate-400">{doctor.location}</p>
      </td>

      {/* Fee + Rating */}
      <td className="px-4 py-3">
        <p className="text-sm font-black text-slate-800">৳ {doctor.fee}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <StarIcon />
          <span className="text-xs text-slate-600 font-semibold">{doctor.rating}</span>
          <span className="text-xs text-slate-400">({doctor.totalReviews})</span>
        </div>
      </td>

      {/* Available Days */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {(doctor.availableDays || []).slice(0, 3).map((d) => (
            <span key={d} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {d.slice(0, 3)}
            </span>
          ))}
          {(doctor.availableDays || []).length > 3 && (
            <span className="text-[10px] text-slate-400">+{doctor.availableDays.length - 3}</span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(doctor)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#eaf3de] hover:text-[#77be0d] transition-colors"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(doctor)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────
function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminDoctorManagement() {
  const { doctors, loading, error, addDoctor, updateDoctor, deleteDoctor } = useDoctors();

  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  // ── Filter ──────────────────────────────────────────────────────
  const filtered = doctors.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.name?.toLowerCase().includes(q) ||
      d.specialist?.toLowerCase().includes(q) ||
      d.hospital?.toLowerCase().includes(q) ||
      d.location?.toLowerCase().includes(q)
    );
  });

  // ── Stats ───────────────────────────────────────────────────────
  const avgRating = doctors.length
    ? (doctors.reduce((sum, d) => sum + (Number(d.rating) || 0), 0) / doctors.length).toFixed(1)
    : "—";

  const stats = [
    { label: "Total Doctors",  value: doctors.length, color: "text-slate-800" },
    { label: "Avg Rating",     value: avgRating,       color: "text-amber-500" },
    { label: "Total Bookings", value: doctors.reduce((s, d) => s + (Number(d.totalReviews) || 0), 0), color: "text-[#77be0d]" },
    { label: "Locations",      value: new Set(doctors.map((d) => d.location)).size, color: "text-blue-600" },
  ];

  // ── Handlers ────────────────────────────────────────────────────
  const handleAdd = () => { setEditDoctor(null); setShowModal(true); };

  const handleEdit = (doctor) => { setEditDoctor(doctor); setShowModal(true); };

  const handleSave = async (formData) => {
    if (editDoctor) {
      await updateDoctor(editDoctor.id, formData);
      Swal.fire({ title: "Doctor updated!", icon: "success", timer: 1500, showConfirmButton: false });
    } else {
      await addDoctor(formData);
      Swal.fire({ title: "Doctor added!", icon: "success", timer: 1500, showConfirmButton: false });
    }
  };

  const handleDelete = (doctor) => {
    Swal.fire({
      title: "Delete this doctor?",
      html: `<strong>${doctor.name}</strong> will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoctor(doctor.id);
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800">Doctor Management</h2>
          <p className="text-sm text-slate-500 mt-0.5">Add, edit, and remove doctors from the platform</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all text-sm"
        >
          <PlusIcon /> Add New Doctor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4">
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by name, specialty, hospital, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-sm transition-colors"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-3">
        Showing <strong className="text-slate-800">{filtered.length}</strong> of {doctors.length} doctors
      </p>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-10 h-10 border-4 border-[#77be0d] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading doctors...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 text-sm">
          ⚠️ Error: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <p className="text-slate-400 text-lg font-bold mb-1">No doctors found</p>
          <p className="text-slate-400 text-sm">
            {doctors.length === 0
              ? "Run the seed script or click \"Add New Doctor\" to get started."
              : "Try adjusting your search."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Doctor", "Specialist", "Hospital", "Fee & Rating", "Available Days", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((doctor) => (
                  <DoctorRow
                    key={doctor.id}
                    doctor={doctor}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <DoctorFormModal
          doctor={editDoctor}
          onClose={() => { setShowModal(false); setEditDoctor(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}