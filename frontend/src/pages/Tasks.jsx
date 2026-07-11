import { useState } from "react";
import "../styles/Tasks.css";
import useTasks from "../hooks/useTasks";
import TasksCard from "../components/TasksCard";

const emptyTask = { title: "", subject: "", deadline: "", priority: "MEDIUM" };
const toDatetimeLocal = (date) =>
  date
    ? new Date(
        new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16)
    : "";

export default function Tasks() {
  const {
    completedTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    create_task,
    update_task,
    delete_task,
  } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyTask);

  const openForm = (task = null) => {
    setEditingTask(task);
    setForm(
      task
        ? {
            title: task.title,
            subject: task.subject,
            deadline: toDatetimeLocal(task.deadline),
            priority: task.priority,
          }
        : emptyTask,
    );
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
    setForm(emptyTask);
  };

  const saveTask = async (event) => {
    event.preventDefault();
    if (editingTask)
      await update_task(
        editingTask._id,
        form.title,
        form.subject,
        form.deadline,
        form.priority,
        editingTask.isCompleted,
      );
    else
      await create_task(form.title, form.subject, form.deadline, form.priority);
    closeForm();
  };

  const removeTask = async (id) => {
    if (window.confirm("Delete this task?")) await delete_task(id);
  };
  
  const toggleComplete = async (task) =>
    await update_task(
      task._id,
      task.title,
      task.subject,
      task.deadline,
      task.priority,
      !task.isCompleted,
    );
  const sections = [
    ["High Priority", highPriorityTasks],
    ["Medium Priority", mediumPriorityTasks],
    ["Low Priority", lowPriorityTasks],
    ["Completed", completedTasks],
  ];

  return (
    <div className="tasks">
      <div className="tasks-heading">
        <h1 className="primary-text">Tasks</h1>
        <button className="add-task-btn" onClick={() => openForm()}>
          + Add Task
        </button>
      </div>
      <div className="tasks-cards-container">
        {sections.map(
          ([title, tasks]) =>
            tasks.length > 0 && (
              <div key={title}>
                <h1 className="priority-heading">{title}</h1>
                {tasks.map((task) => (
                  <TasksCard
                    key={task._id}
                    task={task}
                    onEdit={openForm}
                    onDelete={removeTask}
                    onToggleComplete={toggleComplete}
                  />
                ))}
              </div>
            ),
        )}
      </div>
      {isFormOpen && (
        <div className="task-form-overlay">
          <form className="task-form" onSubmit={saveTask}>
            <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(event) =>
                setForm({ ...form, subject: event.target.value })
              }
              required
            />
            <input
              type="datetime-local"
              value={form.deadline}
              onChange={(event) =>
                setForm({ ...form, deadline: event.target.value })
              }
              required
            />
            <select
              value={form.priority}
              onChange={(event) =>
                setForm({ ...form, priority: event.target.value })
              }
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <div>
              <button className="task-save-btn" type="submit">
                Save
              </button>
              <button
                className="task-cancel-btn"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
