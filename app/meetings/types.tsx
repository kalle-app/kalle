type TimeInterval = [start: string, end: string]

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
  timezone: number
  startDate: Date
  endDate: Date
  location: string
  schedule: Partial<Record<Weekdays, TimeInterval>>
}
