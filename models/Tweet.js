const { Schema, model } = require("mongoose")

const tweetSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            max: 128,
        },
        author: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
    },

    {
        timestamps: true,
    }
);



const Tweet = model("Tweet", tweetSchema);

module.exports = Tweet;