import { Client } from "@microsoft/microsoft-graph-client";
import { UserAgentApplication } from "msal";
const msal = require('@azure/msal-node');
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';

const config = {
  auth: {
      clientId: process.env.MICROSOFTCLIENTID,
      authority: "https://login.microsoftonline.com/common",
      redirectUri: 'http://localhost:3000/outlookRedirect',
      clientSecret: process.env.MICROSOFTCLIENTSECRET
  },
  system: {
      loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
              console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Verbose,
      }
  }
};

export default class MicrosoftClient {
  private static _connection
  private constructor() {}

  public static get Connection() {
    return (
      this._connection ||
      (this._connection = new msal.ConfidentialClientApplication(config))
    )
  }
}
