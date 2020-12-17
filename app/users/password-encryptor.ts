import Encryptor from "secure-e2ee"

function getPassphrase() {
  const envPassphrase = process.env.CALENDAR_PASSWORD_ENCRYPTION_PASSPHRASE

  if (process.env.NODE_ENV === "production") {
    if (envPassphrase?.length !== 32) {
      throw new Error("Please specify a 32-character CALENDAR_PASSWORD_ENCRYPTION_PASSPHRASE.")
    }

    return envPassphrase
  } else {
    return envPassphrase ?? "aVeryVerySecret32CharacterSecret"
  }
}

export default new Encryptor(getPassphrase())
