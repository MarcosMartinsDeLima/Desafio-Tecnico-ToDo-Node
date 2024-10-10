const router = require('express').Router()
const TaskController = require("../controllers/TaskController")
const verifyToken = require("../helper/verifyToken")

router.post("/create",verifyToken,TaskController.createTask)
router.get("/all",verifyToken,TaskController.getAllTasks)
router.get("/:id",verifyToken,TaskController.getById)
router.patch("/updateStatusById/:id",verifyToken,TaskController.updateStatus)
router.put("/updateById/:id",verifyToken,TaskController.updateTarefa)
router.delete("/deleteById/:id",verifyToken,TaskController.delete)

module.exports = router