const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");
const router = Router();

router.post("/create", authMiddleware, taskController.create);

router.put("/edit/:id", authMiddleware, taskController.edit);

router.put("/read/:id", authMiddleware, taskController.read);

router.delete("/delete/:id", authMiddleware, taskController.delete);

router.get("/", authMiddleware, taskController.getUserTasks);

module.exports = router;
