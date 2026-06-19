/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import doctorsData from "../data/doctors.json";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Booking Modal ─────────────────────────────────────────────────
function BookingModal({ doctor, onClose, onConfirm, existingBooking }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [reason, setReason] = useState("");

  const isAlreadyBooked = existingBooking?.doctorId === doctor.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#b2f351] to-[#77be0d] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40"
              />
              <div>
                <h3 className="font-black text-lg leading-tight">{doctor.name}</h3>
                <p className="text-white/80 text-sm">{doctor.specialist}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors mt-1">
              <XIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {isAlreadyBooked ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2 text-emerald-600">
                <CheckIcon />
              </div>
              <p className="font-bold text-emerald-700">Already Booked!</p>
              <p className="text-sm text-emerald-600 mt-1">
                Your appointment is on <strong>{existingBooking.day}</strong>
              </p>
              <p className="text-xs text-emerald-500 mt-1">{doctor.availableTime}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Select Available Day
                </label>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                        selectedDay === day
                          ? "bg-[#77be0d] text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Reason for Visit (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Weight management consultation, BMI check..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 text-sm resize-none transition-colors"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-black text-slate-800">৳ {doctor.fee}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            {isAlreadyBooked ? "Close" : "Cancel"}
          </button>
          {!isAlreadyBooked && (
            <button
              onClick={() => {
                if (!selectedDay) return;
                onConfirm({ doctorId: doctor.id, day: selectedDay, reason, fee: doctor.fee });
              }}
              disabled={!selectedDay}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Cancel Modal ──────────────────────────────────────────────────
function CancelModal({ doctor, booking, onClose, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-500">
          <XIcon />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Cancel Appointment?</h3>
        <p className="text-slate-500 text-sm mb-2">
          Are you sure you want to cancel your appointment with
        </p>
        <p className="font-bold text-slate-700 mb-1">{doctor?.name}</p>
        <p className="text-sm text-slate-500 mb-6">Scheduled on <strong>{booking?.day}</strong></p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            Keep It
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Doctor Card ───────────────────────────────────────────────────
function DoctorCard({ doctor, booking, onBook, onCancel, onViewDetails }) {
  const isBooked = booking?.doctorId === doctor.id;
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${
      isBooked ? "border-[#77be0d] ring-2 ring-[#77be0d]/20" : "border-slate-100"
    }`}>

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={imgError ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" : doctor.image}
          alt={doctor.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top"
        />
        {isBooked && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#77be0d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            <CheckIcon /> Booked
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          ৳ {doctor.fee}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-slate-800 text-base leading-tight mb-0.5">{doctor.name}</h3>
        <p className="text-[#77be0d] font-semibold text-sm mb-2">{doctor.specialist}</p>
        <p className="text-slate-500 text-xs mb-3">{doctor.degree} · {doctor.experience} exp.</p>

        <div className="flex items-center gap-1.5 mb-2">
          <StarIcon />
          <span className="text-sm font-bold text-slate-700">{doctor.rating}</span>
          <span className="text-xs text-slate-400">({doctor.totalReviews} reviews)</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <LocationIcon />
          {doctor.hospital}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <CalendarIcon />
          {doctor.availableDays.slice(0, 3).join(", ")}
          {doctor.availableDays.length > 3 && ` +${doctor.availableDays.length - 3}`}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
          {doctor.specializations.slice(0, 2).map((s) => (
            <span key={s} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(doctor)}
            className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-[#77be0d] hover:text-[#77be0d] transition-all"
          >
            See Details
          </button>
          {isBooked ? (
            <button
              onClick={() => onCancel(doctor)}
              className="flex-1 py-2.5 rounded-xl border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-all"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => onBook(doctor)}
              disabled={!!booking}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Doctor Details Modal ──────────────────────────────────────────
function DetailsModal({ doctor, booking, onClose, onBook, onCancel }) {
  const isBooked = booking?.doctorId === doctor.id;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-4">
        <div className="relative h-48 rounded-t-3xl overflow-hidden bg-slate-200">
          <img
            src={imgError ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" : doctor.image}
            alt={doctor.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <XIcon />
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-black">{doctor.name}</h2>
            <p className="text-white/80 text-sm">{doctor.specialist}</p>
          </div>
          {isBooked && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#77be0d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <CheckIcon /> Appointment Booked
            </div>
          )}
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Experience", value: doctor.experience },
              { label: "Rating", value: `${doctor.rating} ⭐` },
              { label: "Reviews", value: `${doctor.totalReviews}+` },
              { label: "Fee", value: `৳ ${doctor.fee}` },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="font-black text-slate-800 text-base">{item.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">About</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{doctor.about}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations.map((s) => (
                <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#eaf3de] text-[#3d6b08]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm mb-2">
                <CalendarIcon /> Available Days
              </div>
              <div className="flex flex-wrap gap-1.5">
                {doctor.availableDays.map((d) => (
                  <span key={d} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm mb-2">
                <ClockIcon /> Timing
              </div>
              <p className="text-slate-700 font-semibold text-sm">{doctor.availableTime}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                <LocationIcon />
                {doctor.hospital}, {doctor.location}
              </div>
            </div>
          </div>

          {isBooked && booking && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <CheckIcon />
              </div>
              <div>
                <p className="font-bold text-emerald-700 text-sm">Your appointment is confirmed</p>
                <p className="text-emerald-600 text-xs">
                  Day: <strong>{booking.day}</strong>
                  {booking.reason && ` · Reason: ${booking.reason}`}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Close
            </button>
            {isBooked ? (
              <button
                onClick={() => { onCancel(doctor); onClose(); }}
                className="flex-1 py-3 rounded-xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 transition-colors"
              >
                Cancel Appointment
              </button>
            ) : (
              <button
                onClick={() => { onBook(doctor); onClose(); }}
                disabled={!!booking}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Book Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pagination Component 
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-[#77be0d] hover:text-[#77be0d] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeftIcon />
        Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm font-semibold">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              currentPage === page
                ? "bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white shadow-md scale-105"
                : "border-2 border-slate-200 text-slate-600 hover:border-[#77be0d] hover:text-[#77be0d]"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-[#77be0d] hover:text-[#77be0d] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
        <ChevronRightIcon />
      </button>
    </div>
  );
}

// Main Appointment Page 
const CARDS_PER_PAGE = 6;

const Appointment = () => {
  const { user } = useAuth();

  const [booking, setBooking] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`hb_booking_${user?.uid}`)) || null; }
    catch { return null; }
  });

  const [bookModal, setBookModal]       = useState(null);
  const [cancelModal, setCancelModal]   = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [search, setSearch]             = useState("");
  const [filterSpec, setFilterSpec]     = useState("All");
  const [successMsg, setSuccessMsg]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);

  // Persist booking per user
  useEffect(() => {
    if (!user?.uid) return;
    if (booking) {
      localStorage.setItem(`hb_booking_${user.uid}`, JSON.stringify(booking));
    } else {
      localStorage.removeItem(`hb_booking_${user.uid}`);
    }
  }, [booking, user?.uid]);

  // Load booking for current user on mount / user change
  useEffect(() => {
    if (!user?.uid) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`hb_booking_${user.uid}`));
      setBooking(saved || null);
    } catch { setBooking(null); }
  }, [user?.uid]);

  const allSpecialists = ["All", ...new Set(doctorsData.map((d) => d.specialist))];

  const filtered = doctorsData.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialist.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase());
    const matchSpec = filterSpec === "All" || d.specialist === filterSpec;
    return matchSearch && matchSpec;
  });

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginatedDoctors = filtered.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterSpec(e.target.value);
    setCurrentPage(1);
  };

  const handleConfirmBooking = (bookingData) => {
    setBooking(bookingData);
    setBookModal(null);
    setSuccessMsg(`Appointment booked with ${doctorsData.find((d) => d.id === bookingData.doctorId)?.name} on ${bookingData.day}!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCancelConfirm = () => {
    setBooking(null);
    setCancelModal(null);
    setSuccessMsg("Appointment cancelled successfully.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const bookedDoctor = booking ? doctorsData.find((d) => d.id === booking.doctorId) : null;

  // ── Not logged in 
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#eaf3de] flex items-center justify-center mx-auto mb-4 text-[#77be0d]">
            <HeartIcon />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-800">Please Login First</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            You need to be logged in to book a doctor appointment.
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
            Consult a Specialist
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Book Appointment
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Browse our verified doctors and specialists. Book one appointment at a time — you can always cancel and rebook.
          </p>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-6 shadow-sm">
            <span className="text-emerald-600"><CheckIcon /></span>
            <p className="text-sm text-emerald-700 font-medium">{successMsg}</p>
          </div>
        )}

        {/* Active Booking Banner */}
        {booking && bookedDoctor && (
          <div className="bg-white border-2 border-[#77be0d] rounded-2xl px-5 py-4 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={bookedDoctor.image}
                alt={bookedDoctor.name}
                className="w-12 h-12 rounded-xl object-cover object-top"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#77be0d] uppercase tracking-wide">Active Booking</span>
                </div>
                <p className="font-black text-slate-800">{bookedDoctor.name}</p>
                <p className="text-sm text-slate-500">{booking.day} · {bookedDoctor.availableTime}</p>
              </div>
            </div>
            <button
              onClick={() => setCancelModal(bookedDoctor)}
              className="px-4 py-2 rounded-xl border-2 border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors"
            >
              Cancel Appointment
            </button>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search by name, specialty, or hospital..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-800 text-sm transition-colors"
            />
          </div>
          <select
            value={filterSpec}
            onChange={handleFilterChange}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#77be0d] focus:outline-none text-slate-700 text-sm font-medium transition-colors bg-white"
          >
            {allSpecialists.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
          {/* <span>
            <strong className="text-slate-800">{filtered.length}</strong> doctors found
            {totalPages > 1 && (
              <span className="text-slate-400"> · Page {currentPage} of {totalPages}</span>
            )}
          </span> */}
          {booking && (
            <span className="text-[#77be0d] font-semibold">
              · You have 1 active booking
            </span>
          )}
        </div>

        {/* Doctor Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl font-bold mb-2">No doctors found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  booking={booking}
                  onBook={(d) => setBookModal(d)}
                  onCancel={(d) => setCancelModal(d)}
                  onViewDetails={(d) => setDetailsModal(d)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {bookModal && (
        <BookingModal
          doctor={bookModal}
          existingBooking={booking}
          onClose={() => setBookModal(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {cancelModal && (
        <CancelModal
          doctor={cancelModal}
          booking={booking}
          onClose={() => setCancelModal(null)}
          onCancel={handleCancelConfirm}
        />
      )}

      {detailsModal && (
        <DetailsModal
          doctor={detailsModal}
          booking={booking}
          onClose={() => setDetailsModal(null)}
          onBook={(d) => { setDetailsModal(null); setBookModal(d); }}
          onCancel={(d) => setCancelModal(d)}
        />
      )}
    </div>
  );
};

export default Appointment;