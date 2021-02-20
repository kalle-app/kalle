export function formatAs24HourClockString(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat(undefined, { timeZone, timeStyle: "short", hour12: false }).format(
    date
  )
}
