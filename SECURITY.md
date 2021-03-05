# Security Policy

## Supported Versions

We currently don't support any version with security updates.
Kalle is not meant for production usecases, and it's unclear wether it'll ever reach that stage.

## Reporting a Vulnerability

Please [contact Simon](mailto:kalle-security@simonknott.de) and describe the vulnerability.

## Current Security Measures
As we use CalDAV we are required to save your authentication Credentials. We do this by encrpting them. As the passwords are not hashed, be aware that there always will be a risk of them being decrypted. We also reccomend hosting your own version of kalle in order to be in complete control of your credentials.
Google Calendar and MS Outlook credentials will not be saved by us, we only use oauth for this.
Also all pages containing sensitive data require being logged in in ordert to view them.
