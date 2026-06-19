/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import doctorsData from "../data/doctors.json";

import {
  getBookings,
  saveBooking,
  cancelBooking,
  getBookingForDoctor,
} from "../utils/bookingStorage";

import DoctorCard        from "../components/appointment/DoctorCard";
import BookingModal      from "../components/appointment/BookingModal";
import CancelModal       from "../components/appointment/CancelModal";
import DetailsModal      from "../components/appointment/DetailsModal";
import ActiveBookingBanner from "../components/appointment/ActiveBookingBanner";
import SearchFilter      from "../components/appointment/SearchFilter";
import Pagination        from "../components/appointment/Pagination";
import { HeartIcon, CheckIcon } from "../components/appointment/AppointmentIcons";

const CARDS_PER_PAGE = 6;

const Appointment = () => {
  const { user } = useAuth();
  const email = user?.email;

  const [bookings, setBookings]         = useState([]);
  const [bookModal, setBookModal]       = useState(null); // doctor
  const [cancelModal, setCancelModal]   = useState(null); // { doctor, booking }
  const [detailsModal, setDetailsModal] = useState(null); // doctor
  const [search, setSearch]             = useState("");
  const [filterSpec, setFilterSpec]     = useState("All");
  const [successMsg, setSuccessMsg]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);

  // Load bookings from localStorage whenever user changes
  const refreshBookings = useCallback(() => {
    setBookings(getBookings(email));
  }, [email]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  // ── Filter + paginate
  const allSpecialists = ["All", ...new Set(doctorsData.map((d) => d.specialist))];

  const filtered = doctorsData.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(q) ||
      d.specialist.toLowerCase().includes(q) ||
      d.hospital.toLowerCase().includes(q);
    const matchSpec = filterSpec === "All" || d.specialist === filterSpec;
    return matchSearch && matchSpec;
  });

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleFilter = (val) => { setFilterSpec(val); setCurrentPage(1); };

  // ── Booking actions ───────────────────────────────────────────
  const handleConfirmBooking = (bookingData) => {
    const updated = saveBooking(email, bookingData);
    setBookings(updated);
    setBookModal(null);
    setSuccessMsg(`Appointment booked with ${bookingData.doctorName} on ${bookingData.day}!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCancelConfirm = () => {
    const updated = cancelBooking(email, cancelModal.booking.doctorId);
    setBookings(updated);
    setCancelModal(null);
    setSuccessMsg("Appointment cancelled successfully.");
    setTimeout(() => setSuccessMsg(""), 3000);
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
            Browse our verified doctors. You can book multiple appointments — cancel anytime.
          </p>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-6 shadow-sm">
            <span className="text-emerald-600"><CheckIcon /></span>
            <p className="text-sm text-emerald-700 font-medium">{successMsg}</p>
          </div>
        )}

        {/* Active bookings banner */}
        {/* <ActiveBookingBanner
          bookings={bookings}
          onCancel={(b) => {
            const doc = doctorsData.find((d) => d.id === b.doctorId);
            setCancelModal({ doctor: doc, booking: b });
          }}
        /> */}

        {/* Search & Filter */}
        <SearchFilter
          search={search}
          onSearch={handleSearch}
          filterSpec={filterSpec}
          onFilter={handleFilter}
          specialists={allSpecialists}
        />

        {/* Doctor Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl font-bold mb-2">No doctors found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((doctor) => {
                const docBooking = getBookingForDoctor(email, doctor.id);
                return (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    booking={docBooking}
                    onBook={(d) => setBookModal(d)}
                    onCancel={(d) => {
                      const b = getBookingForDoctor(email, d.id);
                      setCancelModal({ doctor: d, booking: b });
                    }}
                    onViewDetails={(d) => setDetailsModal(d)}
                  />
                );
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* ── Modals ── */}
      {bookModal && (
        <BookingModal
          doctor={bookModal}
          alreadyBooked={getBookingForDoctor(email, bookModal.id)}
          onClose={() => setBookModal(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {cancelModal && (
        <CancelModal
          doctor={cancelModal.doctor}
          booking={cancelModal.booking}
          onClose={() => setCancelModal(null)}
          onCancel={handleCancelConfirm}
        />
      )}

      {detailsModal && (
        <DetailsModal
          doctor={detailsModal}
          booking={getBookingForDoctor(email, detailsModal.id)}
          onClose={() => setDetailsModal(null)}
          onBook={(d) => { setDetailsModal(null); setBookModal(d); }}
          onCancel={(d) => {
            const b = getBookingForDoctor(email, d.id);
            setDetailsModal(null);
            setCancelModal({ doctor: d, booking: b });
          }}
        />
      )}
    </div>
  );
};

export default Appointment;
