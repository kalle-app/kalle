function asTwoDigits(number: number) {
  return ("0" + number).slice(-2)
}

export function formatAs24HourClockString(date: Date) {
  return asTwoDigits(date.getHours()) + ":" + asTwoDigits(date.getMinutes())
}
