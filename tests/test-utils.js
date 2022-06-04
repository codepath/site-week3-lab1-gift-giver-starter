function buildReq({ ...overrides } = {}) {
  const req = { body: {}, params: {}, headers: {}, ...overrides }
  return req
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn((data) => data).mockName("json"),
    status: jest.fn(() => res).mockName("status"),
    ...overrides,
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName("next")
}

function buildProxy(reqOrRes) {
  const proxy = new Proxy(reqOrRes, {
    get(target, outerProp) {
      const property = target[outerProp]
      if (property) {
        return property
      }

      return proxy
    },
  })

  return proxy
}

function NamesFactory() {
  const names = ["Amarani", "Bob", "Charise", "Dev", "Eve", "Fernando", "Gizelle", "Habon", "Irene", "Jamile"]

  const createNamesArray = () => [...names]
  // create pairing we don't want to see
  const defaultPairings = [
    ["Amarani", "Bob"],
    ["Charise", "Dev"],
    ["Eve", "Fernando"],
    ["Gizelle", "Habon"],
    ["Irene", "Jamile"],
  ]

  // const moreNames = ["Karen", "Linda", "Molly", "Nancy", "Olivia", "Pamela", "Quinn", "Rachel", "Samantha", "Tiffany", "Ursula", "Vicky", "Wendy", "Xavier", "Yvonne", "Zoe"]
  const oddNumberOfNames = [...names, "Triniti"]
  const createOddNumberOfNames = () => [...oddNumberOfNames]

  return { createNamesArray, defaultPairings, createOddNumberOfNames }
}

module.exports = { buildReq, buildRes, buildNext, buildProxy, NamesFactory }
