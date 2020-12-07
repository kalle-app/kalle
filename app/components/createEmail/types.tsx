export interface Appointment {
  start: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
  }
  duration: {
    hours: number
    minutes: number
  }
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
