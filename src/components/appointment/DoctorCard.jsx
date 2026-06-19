import { useState } from "react";
import { StarIcon, LocationIcon, CalendarIcon, CheckIcon } from "./AppointmentIcons";

export default function DoctorCard({ doctor, booking, onBook, onCancel, onViewDetails }) {
  const isBooked = !!booking;
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
            <CheckIcon /> Booked · {booking.day}
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

        {/* Buttons */}
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
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b2f351] to-[#77be0d] text-white text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
