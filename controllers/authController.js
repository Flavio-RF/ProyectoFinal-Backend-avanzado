const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = {
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;


        try {
            const user = await User.findOne({ email });
            const match = await user.comparePassword(password);
            if (match) {
                const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET)
                res.status(200).json({
                    user,
                    token,
                });
            } else {
                res.status(400).json({ error: "Credenciales Invalidas." })
            }
        } catch (error) {
            console.log(`No se encontro el email: ${email}`);
            console.log(error);
            res.status(500).json({ error: "Internal Server error." });
        }
    },
}