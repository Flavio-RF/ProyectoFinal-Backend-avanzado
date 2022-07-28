const Tweet = require("../models/Tweet")
const User = require("../models/User")


module.exports = {
    showTweets: async (req, res) => {
        const tweets = await Tweet.find()
            .select("-_id -__v -updatedAT")
            .populate("user", "username")

        res.status(200).json(tweets)
    }
}