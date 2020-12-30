export function singleton<T>(factory: () => T) {
  let instance: T | null = null

  return function getSingleton(): T {
    if (instance === null) {
      instance = factory()
    }

    return instance
  }
}
