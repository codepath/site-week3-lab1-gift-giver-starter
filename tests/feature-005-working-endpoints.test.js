const app = require("../app")
const supertest = require("supertest")
const { NamesFactory } = require("./test-utils")

const { createNamesArray, createOddNumberOfNames, defaultPairings } = NamesFactory()

describe("Feature 005 - Working Endpoints", () => {
  const isValidExpressInstance = (app) => {
    expect(app).toHaveProperty("listen"), "app should have a listen method"
    expect(app).toHaveProperty("use"), "app should have a use method"
  }

  describe("`POST` requests to the `/gift-exchange/pairs` endpoint", () => {
    test("Valid requests to the `/gift-exchange/pairs` endpoint recieve the proper response", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app)
        .post("/gift-exchange/pairs")
        .set("Content-Type", "application/json")
        .send({ names: createNamesArray() })

      expect(res.status).toBe(200)

      const pairs = res.body

      expect(pairs).toBeTruthy()
      expect(pairs).toBeInstanceOf(Array)
      expect(pairs).toHaveLength(createNamesArray().length / 2)
      expect(pairs).not.toEqual(defaultPairings)

      for (const pair of pairs) {
        for (const name of pair) {
          expect(createNamesArray()).toContain(name)
        }
      }
    })

    test("Invalid `POST` requests to the `/gift-exchange/pairs` endpoint with no `names` array receive a `400` response", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app).post("/gift-exchange/pairs").set("Content-Type", "application/json").send({})
      expect(res.status).toBe(400)
    })

    test("Invalid `POST` requests to the `/gift-exchange/pairs` endpoint with an uneven number of names receive a `400` response", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app)
        .post("/gift-exchange/pairs")
        .set("Content-Type", "application/json")
        .send({ names: createOddNumberOfNames() })

      expect(res.status).toBe(400)
    })
  })

  describe("`POST` requests to the `/gift-exchange/traditional` endpoint", () => {
    test("Valid requests to the `/gift-exchange/traditional` endpoint recieve the proper response", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app)
        .post("/gift-exchange/traditional")
        .set("Content-Type", "application/json")
        .send({ names: createNamesArray() })

      expect(res.status).toBe(200)

      const result = res.body
      console.log(result)

      expect(result).toBeTruthy()
      expect(result).toBeInstanceOf(Array)
      for (const line of result) {
        expect(line.indexOf("is giving a gift to")).toBeGreaterThanOrEqual(0)
        expect(line?.trim()).toMatch(/^[A-Za-z]+ is giving a gift to [A-Za-z]+$/)
        // const re = new RegExp(`^${name} is giving a gift to ` //) /^[A-Za-z]+ is giving a gift to /
        // re.match()
      }
    })

    test("Invalid `POST` requests to the `/gift-exchange/traditional` endpoint with no `names` array receive a `400` response", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app)
        .post("/gift-exchange/traditional")
        .set("Content-Type", "application/json")
        .send({})

      expect(res.status).toBe(400)
    })
  })
})
