const express = require('express')
const GiftExchange = require("../models/gift-exchange")
const router = express.Router()


router.post("/traditional", async(req, res, next) => {
    const result = await GiftExchange.traditional(req.body.names)
    res.status(200).json({ result})
    
})

router.post("/pairs", async(req, res, next) => {
    const result = await GiftExchange.pairs(req.body.names)
    res.status(200).json({ result})
    
})



module.exports = router;