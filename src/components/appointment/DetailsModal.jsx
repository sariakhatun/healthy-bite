import { useState } from "react";
import { XIcon, CheckIcon, CalendarIcon, ClockIcon, LocationIcon } from "./AppointmentIcons";

export default function DetailsModal({ doctor, booking, onClose, onBook, onCancel }) {
  const isBooked = !!booking;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-4">

        {/* Hero image */}
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Experience", value: doctor.experience },
              { label: "Rating",     value: `${doctor.rating} ⭐` },
              { label: "Reviews",    value: `${doctor.totalReviews}+` },
              { label: "Fee",        value: `৳ ${doctor.fee}` },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="font-black text-slate-800 text-base">{item.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">About</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{doctor.about}</p>
          </div>

          {/* Specializations */}
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

          {/* Schedule */}
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

          {/* Booking confirmation info */}
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
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
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all"
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
