const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")


// app.get("/users",)
// app.get("/session",)

router.post("/users", userController.newUser)
router.post("/sessions", authController.newToken)



module.exports = router