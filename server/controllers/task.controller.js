const taskService = require("../services/task.service");

class TaskController {
  async create(req, res) {
    try {
      const task = await taskService.createTask(req.body);

      res.status(200).json({ message: "Завдання створено", task });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }

  async edit(req, res) {
    try {
      const task = await taskService.editTask(req.body, req.params.id);

      res.status(200).json({ message: "Зміни збережені", task });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }

  async read(req, res) {
    try {
      const task = await taskService.readTask(req.body, req.params.id);

      res.status(200).json(task);
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }

  async delete(req, res) {
    try {
      await taskService.deleteTask(req.params.id);

      res.status(200).json({ message: "Завдання видалено" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }

  async getUserTasks(req, res) {
    try {
      const userTasks = await taskService.getUserTasks(req.user.id);

      res.json(userTasks);
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }
}

module.exports = new TaskController();
