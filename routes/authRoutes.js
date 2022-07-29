const express = require("express")
const router = express.Router()
const privateController = require("../controllers/privateController")
const { expressjwt } = require("express-jwt")


router.get("/tweets", expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
}), privateController.showTweets)


router.post("/tweets", expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
}), privateController.storeTweets)

module.exports = router