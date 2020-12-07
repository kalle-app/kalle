import { singleton } from "./singleton"

test("singleton", () => {
  class ThingThatShouldExistOnlyOnce {}

  const getIt = singleton(() => new ThingThatShouldExistOnlyOnce())

  const firstCallResult = getIt()
  const secondCallResult = getIt()
  expect(firstCallResult).toBe(secondCallResult)
})
