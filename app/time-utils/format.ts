function asTwoDigits(number: number) {
  return ("0" + number).slice(-2)
}

export function formatAs24HourClockString(date: Date) {
  return asTwoDigits(date.getHours()) + ":" + asTwoDigits(date.getMinutes())
}

export function getDateHumanFormat(date: Date): { dateString: string; timeString: string } {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dateString =
    days[date.getDay()] +
    " " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear()
  const timeString = date.getHours() + ":" + date.getMinutes()
  return { dateString: dateString, timeString: timeString }
}
