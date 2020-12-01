export interface Meeting {
  name: string
  link: string
  description: string
  duration: number
  timezone: number
  startDate: Date
  endDate: Date
  schedule: {
    monday: any[]
    tuesday: any[]
    wednesday: any[]
    thursday: any[]
    friday: any[]
    saturday: any[]
    sunday: any[]
  }
  timeslots: string[]
}
