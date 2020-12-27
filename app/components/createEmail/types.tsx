export interface Appointment {
  start: Date
  durationInMilliseconds: number
  title: string
  description: string
  method: string
  location?: string
  url?: string
  organiser: {
    name: string
    email: string
  }
  owner: {
    name: string
    email: string
  }
}
