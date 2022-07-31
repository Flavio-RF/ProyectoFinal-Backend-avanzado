const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/User");



module.exports = {
    register: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        try {

            const newEmail = await User.findOne({ email })
            if (!newEmail) {
                let newUser = await User.create({
                    email,
                    password,
                    username,
                })
                let token = jwt.sign({ sub: newUser._id }, process.env.JWT_SECRET)
                return res.status(201).json({
                    token,
                    user: newUser,
                });
            } else {
                res.status(401).json({ error: "El email ya existe" })
            }

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json(error)
            } else {
                res.status(500).json({
                    error: "Error inesperado en la base de datos.",
                })
                console.log(error)
            }

        }
    },
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ error: `No se encontro el email: ${email} o la contraseña es incorrecta.` })
                return
            }

            let match = await user.comparePassword(password);
            const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET)
            if (match) {
                res.status(200).json({
                    token,
                    user,
                });
            } else {
                res.status(401).json({ error: `No se encontro el email: ${email} o la contraseña es incorrecta.` })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server error." });
        }
    },
}