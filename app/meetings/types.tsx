import * as z from "zod"

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

export const Meeting = z.object({
  name: z.string(),
  link: z.string(),
  description: z.string(),
  duration: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string(),
  scheduleId: z.number()
})
