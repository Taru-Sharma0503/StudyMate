const User = require("../models/user.model");
const Tasks = require("../models/tasks.model");

async function createTask(req, res) {
  try {
    const { title, subject, deadline, priority } = req.body;

    if (
      title.trim() === "" ||
      subject.trim() === "" ||
      !deadline ||
      priority.trim() === ""
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (isNaN(new Date(deadline).getTime())) {
      return res.status(400).json({ message: "Invalid deadline" });
    }

    const task = await Tasks.create({
      user: req.user,
      title,
      subject,
      deadline,
      priority,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: {
        _id: task._id,
        title: task.title,
        subject: task.subject,
        deadline: task.deadline,
        priority: task.priority,
        isCompleted: task.isCompleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Tasks.find({
      user: req.user,
    }).select("-user");

    const completedTasks = [];
    const highPrioritytasks = [];
    const mediumPrioritytasks = [];
    const lowPrioritytasks = [];

    for (let task of tasks) {
      if (task.isCompleted) completedTasks.push(task);
      else if (task.priority === "HIGH") highPrioritytasks.push(task);
      else if (task.priority === "MEDIUM") mediumPrioritytasks.push(task);
      else lowPrioritytasks.push(task);
    }

    if (tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found",
        completedTasks: [],
        highPrioritytasks: [],
        mediumPrioritytasks: [],
        lowPrioritytasks: [],
      });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      completedTasks,
      highPrioritytasks,
      mediumPrioritytasks,
      lowPrioritytasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateTask(req, res) {
  try {
    const { title, subject, deadline, priority, isCompleted } = req.body;
    const id = req.params.id;
    const task = await Tasks.findOne({ _id: id, user: req.user });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = title;
    task.subject = subject;
    task.deadline = deadline;
    task.priority = priority;
    task.isCompleted = isCompleted;

    await task.save();
    return res.status(200).json({
      message: "Task updated successfully",
      task: {
        _id: task._id,
        title: task.title,
        subject: task.subject,
        deadline: task.deadline,
        priority: task.priority,
        isCompleted: task.isCompleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Tasks.findOneAndDelete({ _id: id, user: req.user });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
