const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = {
    newUser: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;


        try {
            const newUser = await User.create({
                email,
                password,
                username,
            })
            const token = jwt.sign({ sub: newUser._id }, process.env.JWT_SECRET)
            return res.status(201).json({
                token,
                user: newUser,
            });

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json(error)
            } else {
                res.status(500).json({
                    error: "Error inesperado en la base de datos."
                })
            }

        }
    }
}