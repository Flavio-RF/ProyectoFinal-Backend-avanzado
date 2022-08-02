const Tweet = require("../models/Tweet")
const User = require("../models/User")


module.exports = {
    showTweets: async (req, res) => {

        const tweets = await Tweet.find()
            .select("-_id -__v -updatedAT")
            .populate("author", "username")


        res.status(200).json(tweets)
    },

    storeTweets: async (req, res) => {
        try {
            const id = req.auth.sub
            const newTweet = await Tweet.create({ text: req.body.text })

            // asociar mensaje al usuario
            let user = await User.findByIdAndUpdate(
                id,
                { $push: { tweet: newTweet._id } },
                { upsert: true, new: true }
            );

            // asociar usuario al mensaje
            newTweet.author = user
            await newTweet.save()

            await newTweet
                .populate("author", "username")

            res.status(204).end();

        } catch (error) {
            res.status(400).json(error)
            console.log(error)
        }


    },
}