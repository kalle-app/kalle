export function mapValues<A, B, K extends string | number | symbol>(
  record: Record<K, A>,
  mapper: (v: A) => B
): Record<K, B> {
  const result: Record<K, B> = {} as any

  for (const [key, value] of Object.entries<A>(record)) {
    result[key] = mapper(value)
  }

  return result
}
