const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


// app.get("/users",)
// app.get("/session",)

router.post("/users", userController.newUser)
// router.post("/session",)



module.exports = router