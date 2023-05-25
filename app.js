const express = require('express') 
const morgan = require('morgan') //log activity in our application
const bodyParser = require('body-parser');
const app = express(); //create a new instance of express application
const giftExchangeRouter = require("./routes/gift-exchange")

app.use("/gift-exchange", giftExchangeRouter)
// const port = 3001

// app.listen(port, ()=> {
//     console.log('Server listening on port' + port)
// })

module.exports = app;
morgan('tiny')

// parse application/json
app.use(bodyParser.json())

// healthcheck
app.get("/", async(req, res, next) => {
    res.status(200).json({ ping: "pong"})
})
