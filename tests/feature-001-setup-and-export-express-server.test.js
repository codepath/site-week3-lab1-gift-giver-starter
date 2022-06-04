const app = require("../app")
const supertest = require("supertest")

jest.mock("morgan", () => {
  const mockMorganLogger = jest.fn()

  const mockMorgan = jest.fn().mockImplementation((...args) => {
    return mockMorganLogger.mockImplementation((req, res, next) => {
      next()
    })
  })

  mockMorgan.compile = jest.fn().mockReturnValue(jest.fn())
  mockMorgan.token = jest.fn().mockReturnValue(mockMorgan)
  mockMorgan.format = jest.fn().mockReturnValue("")
  mockMorgan.mockMorganLogger = mockMorganLogger

  return mockMorgan
})

describe("Feature 001 - Setup and Export Valid Express Server", () => {
  let mockMorgan

  beforeEach(() => {
    mockMorgan = require("morgan")
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const isValidExpressInstance = (app) => {
    expect(app).toHaveProperty("listen"), "app should have a listen method"
    expect(app).toHaveProperty("use"), "app should have a use method"
  }

  describe("The app.js file should export a valid express server", () => {
    test("Default export for `app.js` is a valid express server", () => {
      isValidExpressInstance(app)
    })
  })

  describe("The express server uses the correct middleware", () => {
    test("The app should use the `morgan` middleware as a logger with the `tiny` argument", async () => {
      isValidExpressInstance(app)

      expect(mockMorgan).toHaveBeenCalledTimes(1)
      expect(mockMorgan).toHaveBeenCalledWith("tiny")
    })

    test("The app should use the `express.json` middleware to parse the body of incoming requests as JSON", async () => {
      isValidExpressInstance(app)

      // console.log(app?.router?.stack)

      let spy

      try {
        const layers = app?.router?.stack ?? []

        const bodyParserLayer = layers.find((layer) => layer.name === "jsonParser")
        expect(bodyParserLayer).toBeTruthy()

        const handler = bodyParserLayer.handle
        expect(handler.name).toEqual("jsonParser")

        spy = jest.spyOn(bodyParserLayer, "handle")

        const res = await supertest(app).post("/").set("Content-Type", "application/json").send({ ping: "pong" })
        expect(spy).toHaveBeenCalledTimes(1)
      } catch (e) {
        spy?.mockRestore?.()
        throw e
      }
    })
  })

  describe("GET `/`", () => {
    test('Express app has a default route at `/` that returns a JSON response of { "ping": "pong" } ', async () => {
      isValidExpressInstance(app)

      const res = await supertest(app).get("/")
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ping: "pong" })
    })
  })
})
