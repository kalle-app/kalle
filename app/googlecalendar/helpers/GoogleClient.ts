import { google } from "googleapis"
import { singleton } from "utils/singleton"

export const getGoogleClient = singleton(() => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/gcalOauth2Callback"
  )
})