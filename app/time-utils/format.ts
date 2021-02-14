export function formatAs24HourClockString(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
