# Security Policy

## Supported Versions

We currently do not support any version with security updates.
Kalle is not meant for production use cases, and it is unclear whether it will ever reach that stage.

## Reporting a Vulnerability

Please [contact Simon](mailto:kalle-security@simonknott.de) and describe the vulnerability.

## Current Security Measures
As we use CalDAV we are required to save your authentication credentials. We do this by encrypting them. As the passwords are not hashed, be aware that there always will be a risk of them being decrypted. We also recommend hosting your own version of Kalle in order to have the complete control over your credentials.
Google Calendar and MS Outlook credentials will not be saved by us, we use OAuth for this.
To view pages that contain sensitive information, you must be logged in.
