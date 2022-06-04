const GiftExchange = require("../models/gift-exchange")
const { NamesFactory } = require("./test-utils")

const { createNamesArray, createOddNumberOfNames, defaultPairings } = NamesFactory()

let mathRandomSpy

beforeEach(() => {
  mathRandomSpy = jest.spyOn(Math, "random")
})

afterEach(() => {
  mathRandomSpy.mockRestore()
})

describe("Feature 003 - The Gift Exchange Model", () => {
  describe("The models/gift-exchange.js file should export a valid GiftExchange class with static methods", () => {
    test("Default export for `models/gift-exchange.js` is a valid class", () => {
      expect(GiftExchange).toBeTruthy()
      expect(GiftExchange).toBeInstanceOf(Function)
    })
  })

  describe("The `GiftExchange` model should have four working static methods", () => {
    describe("GiftExchange.pairs()", () => {
      test("The `pairs` method should be a static method", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
      })

      test("The `pairs` method should accept one argument - an array of names", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)
      })

      test("The `pairs` method should return an array of name tuples that are randomly paired together when an even number of names are supplied", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)

        const names = createNamesArray()

        const pairs = GiftExchange.pairs(names)

        expect(pairs).toBeTruthy()
        expect(pairs).toBeInstanceOf(Array)
        expect(pairs).toHaveLength(createNamesArray().length / 2)

        // expect(pairs).toEqual(expect.arrayContaining(defaultPairings))
        expect(pairs).not.toEqual(defaultPairings)

        for (const pair of pairs) {
          for (const name of pair) {
            expect(createNamesArray()).toContain(name)
          }
        }
      })

      test("The `pairs` method should call the `Math.random()` method", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)

        const names = createNamesArray()
        const pairs = GiftExchange.pairs(names)
        expect(mathRandomSpy).toHaveBeenCalled()
      })

      test("The array returned by the `pairs` method should not contain any duplicate names", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)

        const names = createNamesArray()

        const pairs = GiftExchange.pairs(names)

        expect(pairs).toBeTruthy()
        expect(pairs).toBeInstanceOf(Array)
        expect(pairs).toHaveLength(createNamesArray().length / 2)

        // ensure no repeats
        const flatPairs = pairs.flat()
        expect(flatPairs).not.toEqual(createNamesArray())
        expect(new Set(flatPairs).size).toEqual(createNamesArray().length)
      })

      test("The array returned by the `pairs` method should return different pairings each time it is called", async () => {
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)

        const names = createNamesArray()

        const pairs = GiftExchange.pairs(names)

        expect(pairs).toBeTruthy()
        expect(pairs).toBeInstanceOf(Array)
        expect(pairs).toHaveLength(createNamesArray().length / 2)

        const flatPairs = pairs.flat()

        const newPairs = GiftExchange.pairs(createNamesArray())
        expect(newPairs).toBeInstanceOf(Array)
        expect(newPairs).toHaveLength(createNamesArray().length / 2)

        const newFlatPairs = newPairs.flat()

        expect(flatPairs).not.toEqual(newFlatPairs)
      })

      test("The `pairs` method should throw an error when supplied with an odd number of names", async () => {
        expect.assertions(3)
        expect(GiftExchange.pairs).toBeInstanceOf(Function)
        expect(GiftExchange.pairs.length).toBe(1)

        const oddNumberOfNames = createOddNumberOfNames()

        try {
          const pairs = GiftExchange.pairs(oddNumberOfNames)
        } catch (e) {
          expect(e instanceof Error).toBeTruthy()
        }
      })
    })

    describe("GiftExchange.traditional()", () => {
      test("The `traditional` method should be a static method", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
      })

      test("The `traditional` method should accept one argument - an array of names", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)
      })

      test("The `traditional` method should return an array of strings", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const names = createNamesArray()

        const result = GiftExchange.traditional(names)

        expect(result).toBeTruthy()
        expect(result).toBeInstanceOf(Array)
        expect(result).toEqual(expect.arrayContaining([expect.any(String)]))
        expect(result).toHaveLength(createNamesArray().length)
      })

      test("The `traditional` method should call the `Math.random()` method", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const names = createNamesArray()

        const result = GiftExchange.traditional(names)
        expect(mathRandomSpy).toHaveBeenCalled()
      })

      test("The array returned by the `traditional` method contains strings in the correct format of `name1 is giving a gift to name2`", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const names = createNamesArray()

        const result = GiftExchange.traditional(names)

        expect(result).toBeTruthy()
        expect(result).toBeInstanceOf(Array)
        for (const line of result) {
          expect(line.indexOf("is giving a gift to")).toBeGreaterThanOrEqual(0)
          expect(line?.trim()).toMatch(/^[A-Za-z]+ is giving a gift to [A-Za-z]+$/)
          // const re = new RegExp(`^${name} is giving a gift to ` //) /^[A-Za-z]+ is giving a gift to /
          // re.match()
        }
      })

      test("The array returned by the `traditional` method did not leave any users out", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const names = createNamesArray()

        const result = GiftExchange.traditional(names)

        expect(result).toBeTruthy()
        expect(result).toBeInstanceOf(Array)

        const additionalNames = createNamesArray()

        for (const name of additionalNames) {
          // includes name
          expect(result.some((line) => line.includes(name))).toBeTruthy()
          // starts with name (name is giving a gift)
          expect(result.some((line) => line.match(new RegExp(`${name} is giving a gift to `)))).toBeTruthy()
          // ends with name (name is receiving a gift)
          expect(result.some((line) => line.match(new RegExp(`is giving a gift to ${name}`)))).toBeTruthy()
        }
      })

      test("The array returned by the `traditional` method does not contain repeats", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const names = createNamesArray()

        const result = GiftExchange.traditional(names)

        expect(result).toBeTruthy()
        expect(result).toBeInstanceOf(Array)

        expect(new Set(result).size).toEqual(result.length)
      })

      test("The array returned by the `traditional` method should return different pairings each time it is called", async () => {
        expect(GiftExchange.traditional).toBeInstanceOf(Function)
        expect(GiftExchange.traditional.length).toBe(1)

        const result = GiftExchange.traditional(createNamesArray())

        expect(result).toBeTruthy()
        expect(result).toBeInstanceOf(Array)
        expect(result).toEqual(expect.arrayContaining([expect.any(String)]))
        expect(result).toHaveLength(createNamesArray().length)

        const newResult = GiftExchange.traditional(createNamesArray())
        expect(newResult).toBeTruthy()
        expect(newResult).toBeInstanceOf(Array)
        // expect(newResult).toEqual(expect.arrayContaining(expect.any(String)))
        expect(result).toEqual(expect.arrayContaining([expect.any(String)]))
        expect(newResult).toHaveLength(createNamesArray().length)

        expect(result).not.toEqual(newResult)
      })
    })

    // describe("GiftExchange.quiz()", () => {
    //   test("The `quiz` method should be a static method", async () => {
    //     expect(GiftExchange.quiz).toBeInstanceOf(Function)
    //   })
    // })

    // describe("GiftExchange.quizResults()", () => {
    //   test("The `quizResults` method should be a static method", async () => {
    //     expect(GiftExchange.quizResults).toBeInstanceOf(Function)
    //   })
    // })
  })
})
