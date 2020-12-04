export default function getSlotsAtSpecificDate(
  duration: number,
  takenTimeSlots: Array<any>,
  dailySchedule: Array<any>
) {
  var baseDate
  var weekDay
  // console.log("takentimeslot: ", takenTimeSlots)
  // console.log("takentimeslot[0]: ", takenTimeSlots[0])
  try {
    baseDate = takenTimeSlots[0].start
    weekDay = baseDate.getDay()
  } catch (e) {
    console.log("Unexpected Error in getSlotsAtSpecificDate: ", e, " with input: ", takenTimeSlots)
    return null
  }

  var scheduleForWeekDay
  switch (weekDay) {
    case 0:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "sunday")
      break
    case 1:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "monday")
      break
    case 2:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "tuesday")
      break
    case 3:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "wednesday")
      break
    case 4:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "thursday")
      break
    case 5:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "friday")
      break
    case 6:
      scheduleForWeekDay = dailySchedule.find((schedule) => schedule.day === "saturday")
  }

  var availableSlots = []
  // TODO sort time slots ascending by start date (if not sorted by default)
  // TODO account for time zones from server!

  for (var i = 0; i < takenTimeSlots.length; i++) {
    console.log("slot in for loop ", takenTimeSlots[i])

    const currentSlotStart = new Date(takenTimeSlots[i].start)
    const nextSlotStart = new Date(takenTimeSlots[i + 1])
    const currentSlotEnd = new Date(takenTimeSlots[i].end)

    console.log("currentSlotEnd in for loop ", currentSlotEnd)

    if (currentSlotEnd.getUTCHours() > Number(scheduleForWeekDay.startTime.split(":")[0])) {
      console.log(
        "arrived in first if",
        currentSlotEnd.getUTCHours(),
        " and ",
        Number(scheduleForWeekDay.startTime.split(":")[0])
      )

      if (currentSlotEnd.getMinutes() > Number(scheduleForWeekDay.startTime.split(":")[1])) {
        console.log(
          "arrived in 2nd if, ",
          currentSlotEnd.getMinutes(),
          " and ",
          Number(scheduleForWeekDay.startTime.split(":")[1])
        )
        break
      }
    }
    // TODO handle slots that are over midnight
    if (currentSlotEnd.getUTCHours() > Number(scheduleForWeekDay.startTime.split(":")[0])) {
      console.log(
        "2nd 1st if ",
        currentSlotEnd.getUTCHours(),
        " and ",
        Number(scheduleForWeekDay.startTime.split(":")[0])
      )

      if (currentSlotEnd.getMinutes() > Number(scheduleForWeekDay.startTime.split(":")[1])) {
        console.log(
          "2nd 2nd if ",
          currentSlotEnd.getMinutes(),
          " and ",
          Number(scheduleForWeekDay.startTime.split(":")[1])
        )

        break
      }
    }
    if (i + 1 === takenTimeSlots.length) {
      console.log(
        "in i+1 case",
        currentSlotEnd.getUTCHours(),
        " + ",
        Math.floor(duration / 60),
        " < ",
        Number(scheduleForWeekDay.endTime.split(":")[0])
      )

      //todo check if last time slot ending + duration < scheduleForWeek.endTime
      if (
        currentSlotEnd.getUTCHours() + Math.floor(duration / 60) <=
        Number(scheduleForWeekDay.endTime.split(":")[0])
      ) {
        console.log("in i+1 1st if")

        if (
          currentSlotEnd.getMinutes() + (duration % 60) <=
          Number(scheduleForWeekDay.endTime.split(":")[0])
        ) {
          console.log("in i+1 2nd if")
          const startDate = new Date(baseDate)
          startDate.setHours(currentSlotEnd.getUTCHours())
          startDate.setMinutes(currentSlotEnd.getMinutes())
          console.log("startdate before calculation ", startDate)
          var endDate = new Date(baseDate)
          endDate.setMinutes(startDate.getMinutes() + duration)
          endDate = new Date(endDate)
          console.log("startdate: ", startDate)
          console.log("endDate: ", endDate, " duration ", duration)
          // endDate.setHours(currentSlotEnd.getUTCHours() + Math.floor(duration / 60))
          // endDate.setMinutes(startDate.getMinutes() + duration)
          availableSlots.push({ start: startDate, end: endDate })
        }
      }
    } else if (
      currentSlotEnd.getUTCHours() + duration <=
      new Date(takenTimeSlots[i + 1].start).getUTCHours()
    ) {
      const startDate = baseDate
      startDate.setHours(currentSlotEnd.getUTCHours())
      startDate.setMinutes(currentSlotEnd.getMinutes())
      const endDate = baseDate
      endDate.setHours(currentSlotEnd.getUTCHours() + Math.floor(duration / 60))
      endDate.setHours(currentSlotEnd.getUTCHours() + (duration % 60))
      availableSlots.push({ start: startDate, end: endDate })
    }
  }
  console.log("availableSlots: ", availableSlots)

  return availableSlots
}
