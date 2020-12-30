export function checkEnvVariable(name: string) {
  if (!(name in process.env)) {
    throw new Error("EnvironmentVariable " + name + " is not set!")
  }
}

export function checkEnvVariables(...names: string[]) {
  for (const name of names) {
    checkEnvVariable(name)
  }
}
