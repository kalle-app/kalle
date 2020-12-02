export function skipWithoutDocker() {
  if (process.env.SKIP_DOCKER_TESTS) {
    globalThis.describe = globalThis.describe.skip
  }
}
