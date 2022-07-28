const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")


// app.get("/users",)
// app.get("/session",)

router.post("/users", userController.register)
router.post("/sessions", authController.login)



module.exports = router