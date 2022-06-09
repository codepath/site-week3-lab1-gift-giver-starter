# Gift Giver Lab

A client has asked you to create an app that operates as a competitor to https://www.elfster.com. They're a company valued at $6 million that creates gift exchanges for families and friends.

Your client thinks they have a few killer features that could improve on elfster's design and allow them to compete in the market. But first, they need a backend product to work with. They'd like you to build the prototype using Node and Express.

## Project Details

### Goals

By the end of this lab you will be able to... 
- [ ] Build a RESTful API with Node and Express that accepts `POST` and `GET` requests
- [ ] Collect data from a URL using `request.params` and from the body using `request.body`
- [ ] Anticipate and implement error handling methods. 

### Application Features

#### Core feature:

- [ ] Node/Express API written in JavaScript
- [ ] Code to create the Express application and wire up the middleware should be written in the `app.js` file
- [ ] Code to run the API located in the `server.js` file, where it sould import the Express application from the `app.js` code and then make sure it listens on port `3000`.
- [ ] A `GiftExchange` model that implements two different gift-exchange algorithms.
- [ ] An Express router living at the `/gift-exchange` endpoint to handle requests for the two different algorithms
- [ ] Logging and error-handling middleware to enable more seamless interaction with the API

#### Stretch Feature:

- [ ] A router living at the `/quiz` endpoint that responds to two different requests
- [ ] One endpoint should respond to `GET` requests with quiz questions for the user to answer
- [ ] The other endpoint should respond to `POST` requests with results for the user's quiz answers
- [ ] Additional `quizResult` method on the `GiftExchange` model that calculates a score based on the user's input and respond with a type of gift that the user might enjoy

---

### Step 0: Set up your project (5 mins)

#### TDD Lab

- [ ] Start by installing the core dependencies for this project with `npm install`.
- [ ] Try running the tests in the terminal. They should all be failing, but that's ok. We'll use them to guide our development during this lab.

```bash
npm run test
```

- [ ] To start the server in development mode run:

```bash
npm run dev
```

Running the tests along with the server requires having two terminal windows open:

  - [ ] In one run the `npm run dev`
  - [ ] In the other, run `npm run test:watch`

Then, every time a file is updated, the tests will be re-run. At the beginning, the `npm run dev` command will fail since we don't have a valid Express application to run. Let's fix that in the following steps!

:::info
💡 **Tip:** Feel free to use an HTTP client like `insomnia` or `postman` to manually test the application endpoints.
:::

^^^

^^^
<span style="font-size:1.6em; font-weight: 600"> Step 1: Setup a simple Express server (15-20 mins)</span>
^^^

#### Setup a simple Express server

The Express app and server will be split up in two different files - `app.js` and `server.js`
- The `app.js` file will be where all of the actual Express application and middleware code is written
- The `server.js` file has been scaffolded out already, and attempts to import the Express app from the `app.js` file before starting it and setting it to listen on the appropriate port.

---  

#### 📢 Now it’s your turn! 

In the `app.js` file:

- [ ] Wire up a server
  - [ ] Start by using the `express` package to instantiate a simple server application
  - [ ] Export the application from the `app.js` file as its default export
- [ ] Test that the application works.
  - [ ] Punch the `npm run dev` command into the terminal and if all goes well, the server should start up.
- [ ] Add essential middleware
  - [ ] Next, incorporate a logging middleware into the application with the `morgan` package and set its logging level to `tiny`.
  - [ ] Afterwards, set up a request body parsing middleware with the `express.json` method.
  - [ ] Consult the express [docs](https://expressjs.com/en/5x/api.html) if any of these parts seem confusing.
- [ ] Define a "healthcheck" endpoint
  - [ ] Create a single `GET` request handler at the `/` endpoint
    - [ ] It should respond to all `GET` requests with a JSON object and a `200` status code
    - [ ] The JSON response should contain a single key of `ping` that stores the string value: `pong`. As in: `{ "ping": "pong" }`.

### Step 2: Initialize the `/gift-exchange` router (15-20 mins)

  - [ ] Setup files and folders
    - [ ] Create a new directory in the root of the project called `routes`
    - [ ] Inside that directory, create a new file called `gift-exchange.js`
  - [ ] In the `gift-exchange.js` file:
    - [ ] Create an Express router
    - [ ] Make that router the default export for the file
    - [ ] Setup endpoint handlers
      - [ ] Ensure the router has handlers that respond to `POST` requests at the `/pairs` and `/traditional` endpoints.
      - [ ] Both endpoints should accept a JSON body in the `POST` request that contains a key for `names`.
      - [ ] That key should store an array of users who will be entered in the gift exchange.
      - [ ] For now, they can both handle each request with a simple JSON response and a `200` status code
  - [ ] Back in the `app.js` file:
    - [ ] Mount the router to the Express application at the `/gift-exchange` endpoint
    - [ ] The application should now respond to `POST` requests at the `/gift-exchange/pairs` and `/gift-exchange/traditional` endpoints
    - [ ] Restart the server if needed

### Step 3: The `GiftExchange` model (20-25 mins)

  - [ ] Setup files and folders
    - [ ] Create a new directory in the root of the project called `routes`
    - [ ] Inside that directory, create a new file called `gift-exchange.js`
  - [ ] In the `models/gift-exchange.js` file:
    - [ ] Create a `GiftExchange` class
      - [ ] Export the class from the file as its default export
      - [ ] It should contain two static methods:
        - [ ] The `pairs` method:
          - [ ] Should accept a single argument - `names` - which is an array of strings.
            - Example: `["me", "you", "them", "us", "her", "him", "they", "y'all"]`
          - [ ] If the number of names provided is odd, it should throw a new `Error` explaining that the number of names can't be odd.
          - [ ] Should implements an algorithm responsible for randomly **randomly** pairing names together
              - [ ] Should use the `Math.random` method
              - [ ] Should not have any names repeated
              - [ ] Should not exclude any names
          - [ ] Should return an array of tuples (array with only two items) that represent the random pairings
        - [ ] The `traditional` method
          - [ ] Should accept a single argument - `names` - which is an array of strings
            - Example `["me", "you", "them", "us", "her", "him", "they", "y'all"]`
          - [ ] Should implement an algorithm to **randomly** match each name to another name in the list in sequential order:
            - [ ] The result should be an array of strings indicating who is giving a gift to who.
            - [ ] The format of each string should be: `"name1 is giving a gift to name2"`
            - [ ] The recipient of each gift should be the next gift giver
            - [ ] The last person to receive a gift should give a gift to the first person.
            - [ ] No name should give a gift twice, and no name should receive a gift twice
            - [ ] No names should be left out
            - [ ] Should use the `Math.random` method
          - [ ] Should return the array of properly formatted strings


#### GiftExchange model examples:

The `GiftExchange.pairs` method:

```jsx
const names = ["me", "you", "them", "us", "her", "him", "they", "y'all"]
GiftExchange.pairs(names)
// ==> GiftExchange.pairs returns
[
  ["they", "us"],
  ["me", "her"],
  ["y'all", "you"],
  ["them", "him"],
]
```

The `GiftExchange.traditional` method:

```jsx
const names = ["me", "you", "them", "us", "her", "him", "they", "y'all"]
GiftExchange.traditional(names)
// GiftExchange.traditional ==> returns
[
  "they is giving a gift to us",
  "us is giving a gift to me",
  "me is giving a gift to her",
  "her is giving a gift to y'all",
  "y'all is giving a gift to you",
  "you is giving a gift to them",
  "them is giving a gift to him",
  "him is giving a gift to they",
]
```

### Step 4: Error handling (20-25 mins)

  - [ ] Setup files and folders
    - [ ] Create a new directory in the root of the project called `utils`
    - [ ] Inside that directory, create a new file called `errors.js`
  - [ ] In the `utils/errors.js` file:
    - [ ] Create a new error class that inherits from the base `Error` class:
      - [ ] `ExpressError`:
        - [ ] the `constructor` should accept two arguments - `message` and `status`
        - [ ] it should then set a `message` property on new instances of the class that explains what went wrong
        - [ ] it should alos set a `status` property on new instances of the class that represent the status code of the error.
    - [ ] Next, create two new error classes that inherit from the `ExpressError` class
      - [ ] `BadRequestError`:
        - [ ] should have a default `message` property set to `Bad request` that can be overriden in the constructor
        - [ ] should have a `status` property that is set to `400`
      - [ ] `NotFoundError`:
        - [ ] should have a default `message` property set to `Not found` that can be overriden in the constructor
        - [ ] should have a `status` property that is set to `404`
    - [ ] Export all error classes from the file
  - [ ] In the `models/gift-exchange.js` file:
    - [ ] Replace all instances where a generic error is thrown with a `BadRequestError`
  - [ ] In the `app.js` file:
    - [ ] Create error handling middleware:
      - [ ] Generic Error handler
        - [ ] Define a middleware handler after all other middleware, routes, etc in the application
        - [ ] Should be the **last** middleware in the application
        - [ ] The handler should be a function that accepts four arguments - `error`, `req`, `res`, and `next`.
        - [ ] It should extract the `status` and `message` properties from the `error` argument.
          - [ ] If no valid `status` exists, it should default to `500`
          - [ ] If no valid `message` exists, it should default to `Something wen't wrong in the application`
        - [ ] It should always send back a JSON response:
          - [ ] The status code should be set to whatever the `status` is.
          - [ ] The JSON response should be an object:
            - [ ] The object should contain one property - `error`
            - [ ] The `error` property should contain an object with two properties - `status` and `message` - set to the `status` and `message` of the error.
      - [ ] 404 Handler
        - [ ] Define a middleware after all other valid endpoints that does nothing except call the `next` function with a new `NotFoundError`
        - [ ] Should be the **second last** middleware in the application

### Step 5: Wire up the Model and routes

  - [ ] In the `routes/git-exchange.js` file:
    - [ ] Import the `GiftExchange` model
    - [ ] For `POST` requests to either the `/gift-exchange/pairs` or `/gift-exchange/traditional` endpoints:
      - [ ] Use the proper `try...catch...` syntax
      - [ ] Check that a valid request body exists and that the `names` key is found in the request body
      - [ ] If no valid request body exists, the endpoint should call `next` with a `BadRequestError`
      - [ ] If the `names` key in the request body does not exist, or is not a valid array, the endpoint should call `next` with a `BadRequestError`
      - [ ] Call the appropriate `GiftExchange` model with the proper arguments
      - [ ] Send the results back to the user in a JSON response with a `200` status code when everything goes well
      - [ ] Ensure the endpoints pass any caught errors to the `next` function

### Stretch Feature

The client thinks that they have a killer feature that would help them beat elfster in the gift exchange market. They want to provide a BuzzFeed-style quiz that helps the user decide what kind of gift to give. To do that, they'll need you to implement a few things.

#### The `/quiz` endpoint

- [ ] There should be a new router mounted at the `/quiz` endpoint.

- [ ] The router should respond to `GET` and a `POST` requests at the `/` endpoint.

- [ ] There should be two new methods on the `GiftExchange` class - `quiz` and `quizResults`

- [ ] All `GET` requests to the `/quiz` endpiont should call the `GiftGiver.quiz` method and return an array of `5` objects. Each object should have a key for `question` and a key for `answerChoices`. The `question` key should store a string that asks the user a question about their gift recipient. The `answerChoices` key should store an array of answer choices - `a`, `b`, `c`, and `d`.

Example:

```jsx
GiftGiver.quiz()
// GiftGiver.quiz ==> returns
[
  {
    question: "question #1",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  {
    question: "question #2",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  // ... three more questions
]
```

- [ ] The endpoint should respond to `POST` request at the `/quiz` endpoint. It should accept a JSON body containing an array of answers - one for each question in the order they were listed. It should pass those user answers to the `GiftGiver.quizResults` method. The `quizResults` method should assign a points value to each answer choice and then add up all of the points for the user's quiz. That points total should be used to determine what category their gift should be in: "personal care", "clothing", "accessories", "home products", "consumables", or "technology".

Example

```js
const userAnswers = ["b", "d", "a", "a", "c"]
GiftGiver.quizResults(userAnswers)
// GiftGiver.quizResults(userAnswers) ==> returns "technology" or something else
```
