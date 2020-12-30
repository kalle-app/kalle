export function areDatesEqual(a: Date, b: Date) {
  return +a === +b
}

export function areDatesOnSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}
