import GoogleClient from "../../helpers/GoogleClient"

export default async function getCalendars() {
  const oauth2Client = GoogleClient.Connection;
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  
}