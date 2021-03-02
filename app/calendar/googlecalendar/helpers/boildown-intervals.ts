interface Interval {
  start: number
  end: number
}

/**
 * Googlecalendar returns freebusy-slots of multiples calendars. These must be merged.
 * @returns the freebusy slots of all the combined calendars as one
 */
export function boilDownIntervals(arr: Interval[], outerbounds: Interval): Interval[] {
  // Sort the array in descending order
  arr.sort(function (a, b) {
    return a.start - b.start
  })

  let mergedArr: Interval[] = []

  // timestamps of the year 2500 to make the algorithm work, see docs for deeper explanation
  arr.push(outerbounds)
  let old = arr[0]
  let temp: Interval = { start: -1, end: -1 }
  for (let el of arr) {
    let curr = el
    if (curr === old) continue

    if (curr.start <= old.end) {
      if (temp.start === -1) {
        temp.start = old!.start
      }
      curr.start = old.start
    } else {
      if (temp.start === -1) {
        temp.start = old.start!
        temp.end = old.end!
      } else {
        temp.end = old.end!
      }
      mergedArr.push(temp)
      temp = { start: -1, end: -1 }
    }

    old = el
  }

  return mergedArr.sort(function (a, b) {
    return a.start - b.start
  })
}

export function boilDownTimeIntervals(
  interval: { start: Date; end: Date }[]
): { start: Date; end: Date }[] {
  const asNumbers = interval.map((i) => ({ start: +i.start, end: +i.end }))
  const boiledDown = boilDownIntervals(asNumbers, { start: 16754814600000, end: 16754818200000 })
  const asDates = boiledDown.map((i) => ({
    start: new Date(i.start),
    end: new Date(i.end),
  }))
  return asDates
}
