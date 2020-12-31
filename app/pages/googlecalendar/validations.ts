export interface GoogleCalendarCredentialsCredentials{
   access_token: string,
   refresh_token: string,
}

export interface GoogleCalenderCredentials {
   name: string,
   status: string,
   type: string,
   credentials: {
      "access_token": string,
      "refresh_token": string,
   }
}