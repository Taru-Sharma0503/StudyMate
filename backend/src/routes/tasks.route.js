const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const tasksController = require("../controllers/tasks.controller");

router.use(authMiddleware.isLoggedIn);

router.post("/create-task", tasksController.createTask);
router.get("/get-tasks", tasksController.getTasks);
router.patch("/update-task/:id", tasksController.updateTask);
router.delete("/delete-task/:id", tasksController.deleteTask);

module.exports = router;
