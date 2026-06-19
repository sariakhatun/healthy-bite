import { XIcon } from "./AppointmentIcons";

export default function CancelModal({ doctor, booking, onClose, onCancel }) {
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
        <p className="text-sm text-slate-500 mb-6">
          Scheduled on <strong>{booking?.day}</strong>
        </p>
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
