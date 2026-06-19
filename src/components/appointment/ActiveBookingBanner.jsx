export default function ActiveBookingBanner({ bookings, onCancel }) {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="bg-white border-2 border-[#77be0d] rounded-2xl px-5 py-4 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#77be0d] uppercase tracking-wide">
          Active Bookings ({bookings.length})
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {bookings.map((b) => (
          <div key={b.doctorId} className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <img
                src={b.image}
                alt={b.doctorName}
                className="w-11 h-11 rounded-xl object-cover object-top flex-shrink-0"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"; }}
              />
              <div>
                <p className="font-black text-slate-800 text-sm">{b.doctorName}</p>
                <p className="text-xs text-slate-500">{b.specialist} · {b.day} · {b.time}</p>
              </div>
            </div>
            <button
              onClick={() => onCancel(b)}
              className="px-3 py-1.5 rounded-xl border-2 border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
