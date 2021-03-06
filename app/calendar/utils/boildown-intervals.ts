interface Interval {
  start: number
  end: number
}

export function boilDownIntervals(arr: Interval[]): Interval[] {
  if (arr.length === 0) {
    return arr
  }

  arr.sort(function (a, b) {
    return a.start - b.start
  })

  const resultingIntervals: Interval[] = []

  let lastStart = arr[0].start
  let lastEnd = arr[0].end
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i]
    if (v.start <= lastEnd && v.end >= lastEnd) {
      lastEnd = v.end
    } else if (v.start > lastEnd) {
      resultingIntervals.push({
        start: lastStart,
        end: lastEnd,
      })

      lastStart = v.start
      lastEnd = v.end
    }
  }

  resultingIntervals.push({
    start: lastStart,
    end: lastEnd,
  })

  return resultingIntervals
}

export function boilDownTimeIntervals(
  interval: { start: Date; end: Date }[]
): { start: Date; end: Date }[] {
  const asNumbers = interval.map((i) => ({ start: +i.start, end: +i.end }))
  const boiledDown = boilDownIntervals(asNumbers)
  const asDates = boiledDown.map((i) => ({
    start: new Date(i.start),
    end: new Date(i.end),
  }))
  return asDates
}
