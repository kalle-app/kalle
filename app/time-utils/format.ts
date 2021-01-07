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

export function convertToICSDate(dateTime: Date) {
  const year = dateTime.getFullYear().toString()
  const month =
    dateTime.getMonth() + 1 < 10
      ? "0" + (dateTime.getMonth() + 1).toString()
      : (dateTime.getMonth() + 1).toString()
  const day =
    dateTime.getDate() < 10 ? "0" + dateTime.getDate().toString() : dateTime.getDate().toString()
  const hours =
    dateTime.getHours() < 10 ? "0" + dateTime.getHours().toString() : dateTime.getHours().toString()
  const minutes =
    dateTime.getMinutes() < 10
      ? "0" + dateTime.getMinutes().toString()
      : dateTime.getMinutes().toString()

  return year + month + day + "T" + hours + minutes + "00"
}
