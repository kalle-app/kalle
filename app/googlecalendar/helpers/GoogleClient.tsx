import { google } from "googleapis"

export default class GoogleClient {
  private static _connection: any
  private constructor() {}

  testFunction(): void {}

  public static get Connection() {
    return (
      this._connection ||
      (this._connection = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "http://localhost:3000/oauth2Callback"
      ))
    )
  }

  public static Calendar() {
    //return google.calendar({version: 'v3', ()});
  }
}
