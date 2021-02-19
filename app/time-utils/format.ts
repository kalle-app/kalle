export function formatAs24HourClockString(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat(undefined, { timeZone, timeStyle: "short" }).format(date)
}
