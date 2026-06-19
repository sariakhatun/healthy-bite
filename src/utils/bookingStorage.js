// localStorage key per user: "hb_bookings_{userEmail}"
// Each booking: { doctorId, doctorName, specialist, image, day, time, reason, fee, bookedAt }

const getKey = (email) => `hb_bookings_${email}`;

export const getBookings = (email) => {
  if (!email) return [];
  try {
    return JSON.parse(localStorage.getItem(getKey(email))) || [];
  } catch {
    return [];
  }
};

export const saveBooking = (email, booking) => {
  if (!email) return [];
  const existing = getBookings(email);
  // remove if same doctor already booked (re-book scenario)
  const filtered = existing.filter((b) => b.doctorId !== booking.doctorId);
  const updated = [
    ...filtered,
    { ...booking, bookedAt: new Date().toISOString() },
  ];
  localStorage.setItem(getKey(email), JSON.stringify(updated));
  return updated;
};

export const cancelBooking = (email, doctorId) => {
  if (!email) return [];
  const existing = getBookings(email);
  const updated = existing.filter((b) => b.doctorId !== doctorId);
  localStorage.setItem(getKey(email), JSON.stringify(updated));
  return updated;
};

export const getBookingForDoctor = (email, doctorId) =>
  getBookings(email).find((b) => b.doctorId === doctorId) || null;

export const isDocBooked = (email, doctorId) =>
  getBookings(email).some((b) => b.doctorId === doctorId);
