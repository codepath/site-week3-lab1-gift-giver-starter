const app = require("../app")
const express = require("express")
const supertest = require("supertest")
const router = require("../routes/gift-exchange")

describe("Feature 002 - The Gift Exchange Router", () => {
  const isValidRouter = (r) => {
    expect(router).toBeInstanceOf(express.Router), "router should be an instance of express.Router"
  }

  describe("The routes/gift-exchange.js file should export a valid express Router", () => {
    test("Default export for `routes/gift-exchange.js` is a valid express Router", () => {
      isValidRouter(router)
    })
  })

  describe(`Router is mounted to the express server at the \`/gift-exchange\` endpoint`, () => {
    test("Router is mounted at `/gift-exchange`", async () => {
      const regexPaths =
        app?.router?.stack?.filter((layer) => layer.regexp.test("/gift-exchange") && layer.name === "router") ?? []
      expect(regexPaths).toHaveLength(1)
      expect(regexPaths[0].regexp.toString().includes("gift-exchange")).toBe(true)
    })
  })

  describe(`POST  \`/gift-exchange/pairs\``, () => {
    test("The `/gift-exchange/pairs` endpoint is a valid post route", async () => {
      const res = await supertest(app).post("/gift-exchange/pairs", {})
      expect(res.status).not.toBe(404)
    })
  })

  describe(`POST  \`/gift-exchange/traditional\``, () => {
    test("The `/gift-exchange/traditional` endpoint is a valid post route", async () => {
      const res = await supertest(app).post("/gift-exchange/traditional", {})
      expect(res.status).not.toBe(404)
    })
  })
})
