export interface Meeting {
  name: string
  link: string
  description: string
  duration: number
  timezone: number
  startDate: Date
  endDate: Date
  location: string
  schedule: {
    monday: string[]
    tuesday: string[]
    wednesday: string[]
    thursday: string[]
    friday: string[]
    saturday: string[]
    sunday: string[]
  }
  timeslots: string[]
}
