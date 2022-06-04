const app = require("../app")
const { BadRequestError, NotFoundError } = require("../utils/errors")
const supertest = require("supertest")
const { buildReq, buildRes, buildNext } = require("./test-utils")

jest.mock("../utils/errors", () => {
  const actualErrorsModule = jest.requireActual("../utils/errors")

  return {
    ...actualErrorsModule,
    NotFoundError: jest.fn().mockImplementation((...args) => {
      const ErrorImplementation = actualErrorsModule.NotFoundError
      if (ErrorImplementation) return new ErrorImplementation(...args)
      return null
    }),
    BadRequestError: actualErrorsModule.BadRequestError,
  }
})

describe("Feature 004 - Server Error Handlers", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  const isValidExpressInstance = (app) => {
    expect(app).toHaveProperty("listen"), "app should have a listen method"
    expect(app).toHaveProperty("use"), "app should have a use method"
  }

  describe("Custom errors", () => {
    test("The `utils/errors.js` file should export classes for `BadRequestError` and `NotFoundError` that inherit from the base `Error` class ", async () => {
      expect(new BadRequestError()).toBeInstanceOf(Error)
      expect(new NotFoundError()).toBeInstanceOf(Error)
    })

    test("The `BadRequestError` and `NotFoundError` classes should both have the correct `message` and `status` property.", async () => {
      expect(new BadRequestError()).toBeInstanceOf(Error)
      expect(new NotFoundError()).toBeInstanceOf(Error)

      const badErrorInstance = new BadRequestError()
      expect(typeof badErrorInstance?.message).toBe("string")
      expect(typeof badErrorInstance?.status).toBe("number")
      expect(badErrorInstance?.status).toEqual(400)

      const notFoundErrorInstance = new NotFoundError()
      expect(typeof notFoundErrorInstance?.message).toBe("string")
      expect(typeof notFoundErrorInstance?.status).toBe("number")
      expect(notFoundErrorInstance?.status).toEqual(404)
    })
  })

  describe("Server generic error handler", () => {
    test(
      "A generic error handler should be the last middleware in the server. " +
        "The middleware function should accept 4 arguments - error, request, response, and next",
      async () => {
        const layers = app?.router?.stack ?? []
        const lastLayer = layers[layers.length - 1]
        expect(lastLayer).toBeTruthy()

        const handler = lastLayer.handle
        expect(handler).toBeInstanceOf(Function)
        expect(handler.length).toBe(4)
      }
    )

    test(
      "The generic error handler should send an object back to the client containing a single property named `error`. " +
        "The error property should be an object with `status` and `message` properties equal to the status and message of the `NotFoundError`.",
      async () => {
        const layers = app?.router?.stack ?? []
        const lastLayer = layers[layers.length - 1]
        expect(lastLayer).toBeTruthy()

        const req = buildReq()
        const res = buildRes()
        const next = buildNext()

        const err = new BadRequestError("test error")

        const response = await lastLayer?.handle?.(err, req, res, next)
        expect(response).toEqual({
          error: { message: err.message, status: err.status },
        })
      }
    )
  })

  describe("Server 404 error handler", () => {
    let notFoundErrorSpy

    beforeEach(() => {
      // Clear all instances and calls to constructor:
      NotFoundError.mockClear()
    })

    afterEach(() => {
      notFoundErrorSpy?.mockRestore()
    })

    test(
      "A 404 error handler should be the 2nd to last middleware in the server. " +
        "The middleware function should accept 3 arguments - request, response, and next.",
      async () => {
        const layers = app?.router?.stack ?? []
        const secondLastLayer = layers[layers.length - 2]
        expect(secondLastLayer).toBeTruthy()

        const handler = secondLastLayer.handle
        expect(handler).toBeInstanceOf(Function)
        expect(handler.length).toBe(3)
      }
    )

    test("The 404 middleware function should always do the same thing - call the `next` function with a new instance of the `NotFoundError` error.", async () => {
      const layers = app?.router?.stack ?? []
      const secondLastLayer = layers[layers.length - 2]
      expect(secondLastLayer).toBeTruthy()

      const req = buildReq()
      const res = buildRes()
      const next = buildNext()

      const result = await secondLastLayer?.handle(req, res, next)
      expect(NotFoundError).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
      // expect(next).toHaveBeenCalledWith(new NotFoundError())
      expect(typeof next.mock.calls[0][0]).toEqual(typeof new NotFoundError())

      const errInstance = next.mock.calls[0][0]
      expect(errInstance).toBeInstanceOf(Error)
      expect(errInstance.status).toEqual(404)
    })

    test("An instance of the `NotFoundError` class should be created whenever a request for a missing route is sent to the server", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app).get("/missing-route")
      expect(NotFoundError).toHaveBeenCalledTimes(1)
    })

    test("Requests to missing endpoints should return a response with a 404 status code", async () => {
      isValidExpressInstance(app)

      const res = await supertest(app).get("/missing-route")
      expect(NotFoundError).toHaveBeenCalledTimes(1)
      expect(res.status).toBe(404)
    })

    test(
      "Requests to missing endpoints should provide the client with an object containing a single property named `error`. " +
        "The error property should be an object with `status` and `message` properties equal to the status and message of the `NotFoundError`.",
      async () => {
        isValidExpressInstance(app)

        const res = await supertest(app).get("/missing-route")
        expect(NotFoundError).toHaveBeenCalledTimes(1)
        const errorMessageArgument = NotFoundError.mock.calls[0][0]
        const defaultErrorMessage = new NotFoundError().message
        expect(res.body).toEqual({ error: { message: expect.any(String), status: 404 } })
        expect([errorMessageArgument, defaultErrorMessage]).toContain(res.body.error.message)
      }
    )
  })
})
