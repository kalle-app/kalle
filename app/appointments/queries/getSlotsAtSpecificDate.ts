export default function getSlotsAtSpecificDate(
  duration: Number,
  takenTimeSlots: Array<any>,
  dailySchedule: Array<any>
) {
  var weekDay
  try {
    weekDay = takenTimeSlots[0].start.getDay()
  } catch (e) {
    console.log("Unexpected Error in getSlotsAtSpecificDate: ", e)
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

  var availableSlots;

  // account for time zones from server!
  const get

  for (var i = 0; i < takenTimeSlots.length; i ++){
    if takenTimeSlots[i].end.getHours() > scheduleForWeekDay.startTime.split(":")[0]
  }



  return null
}
