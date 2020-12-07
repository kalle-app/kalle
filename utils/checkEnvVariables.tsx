export function checkEnvVariable(name: string) {
  if (!(name in process.env)) {
    throw new Error("EnvironmentVariable " + name + " is not set!")
  }
}
