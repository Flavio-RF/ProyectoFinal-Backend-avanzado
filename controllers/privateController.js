const Tweet = require("../models/Tweet")
const User = require("../models/User")


module.exports = {
    showTweets: async (req, res) => {

        const id = req.auth.sub
        const user = await User.findById(id)


        const tweets = await Tweet.find()
            .select("-_id -__v -updatedAT")
            .populate("user", "id")


        res.status(200).json(tweets)
    },

    storeTweets: async (req, res) => {
        try {
            const id = req.auth.sub
            const tweet = req.body.tweet

            const newTweet = await Tweet.create({ tweet })

            // asociar mensaje al usuario
            await User.findByIdAndUpdate(
                id,
                { $push: { tweet: newTweet._id } },
                { upsert: true, new: true }
            );

            // asociar usuario al mensaje
            newTweet.user = id
            await newTweet.save()

            const tweetPopulated = await newTweet
                .populate("user", "user")

            res.status(201).json(tweetPopulated)

        } catch (error) {
            res.status(400).json(error)
            console.log(error)

        }


    },


    // const user = await User.findOneAndUpdate(
    //     { username: user.username },
    //     { $push: {} }
    // )
}