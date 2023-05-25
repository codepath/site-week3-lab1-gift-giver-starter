# Gift Giver Lab

A client has asked you to create an app that operates as a competitor to [Elfster](https://www.elfster.com). They're a company valued at $6 million that creates gift exchanges for families and friends.

Your client thinks they have a few killer features that could improve on Elfster's design and allow them to compete in the market. But first, they need a backend product to work with. They'd like you to build the prototype using Node and Express.

## Getting Started

Run `npm install` to install required dependencies, then `npm start` to start the server.

## Application Features

### Core features

- [ ] Create the Express application and wire up the middleware should be written in the `app.js` file
- [ ] Code to run the API located in the `server.js` file, where it should import the Express application from the `app.js` code and then make sure it listens on port `3000`.
- [ ] A `GiftExchange` model that implements two different gift-exchange algorithms.
- [ ] An Express router living at the `/gift-exchange` endpoint to handle requests for the two different algorithms
- [ ] Logging and error-handling middleware to enable more seamless interaction with the API

### Stretch Features

- [ ] Implement a `/quiz` endpoint that responds `GET` requests with quiz questions for the user to answer
- [ ] Implement a `/quiz` endpoint that responds to `POST` requests with results for the user's quiz answers
- [ ] Implement a `quizResult` function in the `GiftExchange` model that calculates a score based on the user's input and responds with a type of gift that the user might enjoy
