import { useState } from "react";
import { XIcon, CheckIcon } from "./AppointmentIcons";

export default function BookingModal({ doctor, onClose, onConfirm, alreadyBooked }) {
  const [selectedDay, setSelectedDay] = useState(alreadyBooked?.day || "");
  const [reason, setReason] = useState("");

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
                className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-white/40"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"; }}
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
          {alreadyBooked ? (
            /* Already booked this doctor */
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2 text-emerald-600">
                <CheckIcon />
              </div>
              <p className="font-bold text-emerald-700">Already Booked!</p>
              <p className="text-sm text-emerald-600 mt-1">
                Your appointment is on <strong>{alreadyBooked.day}</strong>
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
                  Reason for Visit <span className="text-slate-400 normal-case font-normal">(optional)</span>
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
            {alreadyBooked ? "Close" : "Cancel"}
          </button>
          {!alreadyBooked && (
            <button
              onClick={() => {
                if (!selectedDay) return;
                onConfirm({
                  doctorId:   doctor.id,
                  doctorName: doctor.name,
                  specialist: doctor.specialist,
                  hospital:   doctor.hospital,
                  image:      doctor.image,
                  time:       doctor.availableTime,
                  fee:        doctor.fee,
                  day:        selectedDay,
                  reason,
                });
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
