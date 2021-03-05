export interface TimeSlotString {
    start: string
    end: string
  }
  
export interface DateTimeUnix {
start: number
end: number
}

/**
 * some calendar return freebusy-slots of multiples calendars or overlapping events. These must be merged.
 * @returns the freebusy slots of all the combined calendars/events as one
 */
export function mergeArr(arr: DateTimeUnix[]): DateTimeUnix[] {
// Sort the array in descending order
arr.sort(function (a, b) {
    return a.start - b.start
})

let mergedArr: DateTimeUnix[] = []

// timestamps of the year 2500 to make the algorithm work, see docs for deeper explanation
arr.push({ start: 16754814600, end: 16754818200 })
let old = arr[0]
let temp: DateTimeUnix = { start: -1, end: -1 }
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
  
export function convertToUnix(arr: TimeSlotString[]): DateTimeUnix[] {
return arr.map((el: TimeSlotString) => {
    return {
    start: new Date(el.start).getTime() / 1000,
    end: new Date(el.end).getTime() / 1000,
    }
})
}

export function convertToExternalEvent(arr: DateTimeUnix[]): ExternalEvent[] {
return arr.map((el: DateTimeUnix) => {
    return {
    start: new Date(el.start * 1000),
    end: new Date(el.end * 1000),
    }
})
}