import { verifyConnectionDetails, CalendarConnectionDetails } from "app/caldav"

interface AuthenticateCaldavArgs {
  url: string
  username: string
  password: string
}

export default async function authenticateCalDav(args: AuthenticateCaldavArgs) {
  const res = await verifyConnectionDetails(args.url, args.username, args.password)
  return res
}
