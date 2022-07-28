const { Schema, model } = require("mongoose")

const tweetSchema = new Schema(
    {
        tweet: String,
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ]

    },
    {
        timestamps: true,
    }

);

const Tweet = model("Tweet", tweetSchema);

module.exports = Tweet;