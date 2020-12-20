export interface Meeting {
  name: string
  link: string
  description: string
  duration: number
  timezone: number
  startDate: Date
  endDate: Date
  scheduleId: number
  timeslots: string[]
}
