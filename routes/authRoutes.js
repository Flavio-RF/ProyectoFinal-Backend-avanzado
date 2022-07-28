const express = require("express")
const router = express.Router()
const tweetController = require("../controllers/tweetController")
const { expressjwt } = require("express-jwt")

router.get("/tweets", expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
}), tweetController.showTweets)


// router.post("tweet",)

module.exports = router