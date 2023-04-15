const Task = require("../models/Task");
const userService = require("./user.service");

class TaskService {
  async createTask(reqBody) {
    const {
      creator,
      title,
      priority,
      deadline,
      status,
      checked,
      readedBy,
      users,
      text,
    } = reqBody;

    const task = await Task.create({
      creator,
      title,
      priority,
      deadline,
      status,
      checked,
      readedBy,
      users,
      text,
    });

    await userService.addUserOwnTask(creator._id, task._id);

    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        await userService.addUserOtherTask(users[i]._id, task._id);
      }
    }

    return task;
  }

  async editTask(reqBody, taskId) {
    const {
      title,
      priority,
      deadline,
      status,
      checked,
      readedBy,
      users,
      text,
    } = reqBody;

    const oldTask = await Task.findById(taskId);
    const oldUsers = oldTask.users;
    const newUsers = users;

    await Task.updateOne(
      { _id: taskId },
      { title, priority, deadline, status, checked, readedBy, users, text }
    );

    if (oldUsers.length > 0) {
      for (let i = 0; i < oldUsers.length; i++) {
        if (newUsers.indexOf((u) => u._id === oldUsers[i]._id) === -1) {
          await userService.removeUserOtherTask(oldUsers[i]._id, taskId);
        }
      }
    }

    if (newUsers.length > 0) {
      for (let i = 0; i < newUsers.length; i++) {
        if (oldUsers.indexOf((u) => u._id === newUsers[i]._id) === -1) {
          await userService.addUserOtherTask(newUsers[i]._id, taskId);
        }
      }
    }
    const newTask = await Task.findById(taskId);

    return newTask;
  }

  async readTask(reqBody, taskId) {
    const { readedBy } = reqBody;

    await Task.updateOne({ _id: taskId }, { readedBy });

    const newTask = await Task.findById(taskId);

    return newTask;
  }

  async deleteTask(taskId) {
    const task = await Task.findById(taskId);

    await userService.removeUserOwnTask(task.creator._id, taskId);

    if (task.users.length > 0) {
      for (let i = 0; i < task.users.length; i++) {
        await userService.removeUserOtherTask(task.users[i]._id, taskId);
      }
    }

    return await Task.deleteOne({ _id: taskId });
  }

  async getUserTasks(userId) {
    const user = await userService.getOneUser(userId);

    const ownTasks = await Task.find({ _id: { $in: user.ownTasks } });

    const otherTasks = await Task.find({ _id: { $in: user.otherTasks } });

    return { ownTasks, otherTasks };
  }
}

module.exports = new TaskService();
