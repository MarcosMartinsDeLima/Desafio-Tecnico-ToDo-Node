const router = require("express").Router()
const UserController = require("../controllers/UserController")

router.post("/create",UserController.createUser)
router.post("/login",UserController.Login)

module.exports = router