export const Weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const

export type Weekdays = typeof Weekdays[number]

export interface Meeting {
  name: string
  link: string
  description: string
  duration: number
  startDate: Date
  endDate: Date
  location: string
  scheduleId: number
}
