const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { check } = require("express-validator")


// app.get("/users",)
// app.get("/session",)

router.post("/users", [
    check("email")
        .isEmail()
        .withMessage("invalid email.")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 6, max: 15 })
        .withMessage("invalid password"),
], userController.register)

router.post("/sessions", userController.login)



module.exports = router