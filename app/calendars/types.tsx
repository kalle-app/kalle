export interface Meeting {
  name: string
  link: string
  description: string
  timezone: number
  startDate: string
  endDate: string
  schedule: {
    monday: any[]
    tuesday: any[]
    wendsday: any[]
    thursday: any[]
    friday: any[]
    saturday: any[]
    sunday: any[]
  }
  timeslots: string[]
}
