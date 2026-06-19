/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import doctorsData from "../../data/doctors.json";
import { getBookings, cancelBooking } from "../../utils/bookingStorage";
import CancelModal from "../appointment/CancelModal";

// ── Icons ──────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const EmptyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-slate-300">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <line x1="8" y1="18" x2="13" y2="18" />
  </svg>
);

// ── Booking Card ───────────────────────────────────────────────────
function BookingCard({ booking, onCancel }) {
  const doctor = doctorsData.find((d) => d.id === booking.doctorId);
  const [imgError, setImgError] = useState(false);

  const bookedDate = new Date(booking.bookedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="flex flex-col sm:flex-row">

        {/* Doctor image */}
        <div className="sm:w-28 h-32 sm:h-auto flex-shrink-0 overflow-hidden bg-slate-100">
          <img
            src={imgError ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80" : booking.image}
            alt={booking.doctorName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-black text-slate-800 text-base leading-tight">{booking.doctorName}</h3>
                <p className="text-[#77be0d] font-semibold text-sm">{booking.specialist}</p>
              </div>
              {/* Status badge */}
              <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                Confirmed
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarIcon />
                {booking.day}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ClockIcon />
                {booking.time}
              </div>
              {doctor && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <LocationIcon />
                  {doctor.hospital}
                </div>
              )}
            </div>

            {booking.reason && (
              <p className="text-xs text-slate-400 mt-2 italic">
                Reason: {booking.reason}
              </p>
            )}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-slate-800">৳ {booking.fee}</span>
              <span className="text-xs text-slate-400">Booked on {bookedDate}</span>
            </div>
            <button
              onClick={() => onCancel(booking)}
              className="px-4 py-1.5 rounded-xl border-2 border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main MyBookings Component ──────────────────────────────────────
export default function MyBookings() {
  const { user } = useAuth();
  const email = user?.email;

  const [bookings, setBookings]       = useState([]);
  const [cancelModal, setCancelModal] = useState(null); // { doctor, booking }
  const [successMsg, setSuccessMsg]   = useState("");

  const refreshBookings = useCallback(() => {
    setBookings(getBookings(email));
  }, [email]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  const handleCancelConfirm = () => {
    const updated = cancelBooking(email, cancelModal.booking.doctorId);
    setBookings(updated);
    setCancelModal(null);
    setSuccessMsg("Appointment cancelled successfully.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const openCancel = (booking) => {
    const doctor = doctorsData.find((d) => d.id === booking.doctorId);
    setCancelModal({ doctor, booking });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaf3de] flex items-center justify-center text-[#77be0d]">
            <CalendarIcon />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">My Bookings</h2>
            <p className="text-sm text-slate-500">
              {bookings.length === 0
                ? "No appointments booked yet"
                : `${bookings.length} appointment${bookings.length > 1 ? "s" : ""} booked`}
            </p>
          </div>
        </div>
        <Link to="/appointment">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all">
            + Book New
          </button>
        </Link>
      </div>

      {/* Success toast */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4 text-sm text-emerald-700 font-medium">
          <span>✓</span> {successMsg}
        </div>
      )}

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <div className="flex justify-center mb-4">
            <EmptyIcon />
          </div>
          <h3 className="font-bold text-slate-700 text-lg mb-2">No Bookings Yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
            You haven't booked any doctor appointments yet. Browse our specialists and book your first appointment.
          </p>
          <Link to="/appointment">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold text-sm hover:opacity-90 transition">
              Browse Doctors
            </button>
          </Link>
        </div>
      ) : (
        /* Booking list */
        <div className="space-y-4">
          {/* Sort newest first */}
          {[...bookings]
            .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
            .map((booking) => (
              <BookingCard
                key={booking.doctorId}
                booking={booking}
                onCancel={openCancel}
              />
            ))}
        </div>
      )}

      {/* Cancel Modal */}
      {cancelModal && (
        <CancelModal
          doctor={cancelModal.doctor}
          booking={cancelModal.booking}
          onClose={() => setCancelModal(null)}
          onCancel={handleCancelConfirm}
        />
      )}
    </div>
  );
}
