const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parses "YYYY-MM-DD" as a calendar date (no timezone shift). */
function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, weekday };
}

export function formatLongDate(iso: string) {
  const { y, m, d, weekday } = parts(iso);
  return `${DAYS[weekday]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatShortDate(iso: string) {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function dateParts(iso: string) {
  const { y, m, d, weekday } = parts(iso);
  return { day: d, month: MONTHS[m - 1], year: y, weekday: DAYS[weekday] };
}
