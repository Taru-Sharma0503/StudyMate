import "../styles/Dashboard.css";
import useTasks from "../hooks/useTasks";
import useNotes from "../hooks/useNotes";
import DashboardCard from "../components/DashboardCard";
import NotesCard from "../components/NotesCard";
import TasksCard from "../components/TasksCard";
import { ProgressBar } from "react-loader-spinner";
import { useState } from "react";

export default function Dashboard() {
  const { notes, loading: notesLoading, update_note, delete_note } = useNotes();
  const {
    completedTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    create_task,
    update_task,
    delete_task,
    loading: tasksLoading,
  } = useTasks();
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", file: null });
  const [editingTask, setEditingTask] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    subject: "",
    deadline: "",
    priority: "MEDIUM",
  });

  const openNoteForm = (note) => {
    setEditingNote(note);
    setForm({ title: note.title, description: note.description, file: null });
  };
  const saveNote = async (event) => {
    event.preventDefault();
    if (!form.file) return;
    await update_note(editingNote.id, form.title, form.description, form.file);
    setEditingNote(null);
  };
  const removeNote = async (id) => {
    if (window.confirm("Delete this note?")) await delete_note(id);
  };
  const openTaskForm = (task = null) => {
    setEditingTask(task);
    setTaskForm(
      task
        ? {
            title: task.title,
            subject: task.subject,
            deadline: new Date(
              new Date(task.deadline).getTime() -
                new Date(task.deadline).getTimezoneOffset() * 60000,
            )
              .toISOString()
              .slice(0, 16),
            priority: task.priority,
          }
        : { title: "", subject: "", deadline: "", priority: "MEDIUM" },
    );
    setIsTaskFormOpen(true);
  };
  const saveTask = async (event) => {
    event.preventDefault();
    if (editingTask)
      await update_task(
        editingTask._id,
        taskForm.title,
        taskForm.subject,
        taskForm.deadline,
        taskForm.priority,
        editingTask.isCompleted,
      );
    else
      await create_task(
        taskForm.title,
        taskForm.subject,
        taskForm.deadline,
        taskForm.priority,
      );
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };
  const removeTask = async (id) => {
    if (window.confirm("Delete this task?")) await delete_task(id);
  };
  const toggleTask = async (task) => {
    await update_task(
      task._id,
      task.title,
      task.subject,
      task.deadline,
      task.priority,
      !task.isCompleted,
    );
  };

  if (notesLoading || tasksLoading) {
    return (
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h1 className="primary-text">Welcome Back!!</h1>
        <p className="intro-text">
          You have{" "}
          {highPriorityTasks.length +
            mediumPriorityTasks.length +
            lowPriorityTasks.length}{" "}
          tasks pending for today. Let's get things done.
        </p>
      </div>

      <div className="dashboard-statistics">
        <DashboardCard
          title="Total Notes"
          value={notes.length}
          bgColor="#4F46E5"
        />
        <DashboardCard
          title="Pending Tasks"
          value={
            highPriorityTasks.length +
            mediumPriorityTasks.length +
            lowPriorityTasks.length
          }
          bgColor="red"
        />
        <DashboardCard
          title="Completed Tasks"
          value={completedTasks.length}
          bgColor="cyan"
        />
      </div>

      <div className="recent-activity">
        <div className="recent-notes">
          <h1 className="recent-activity-heading">Your Notes</h1>
          {notes.map((note) => (
            <NotesCard
              key={note._id}
              id={note._id}
              title={note.title}
              description={note.description}
              fileUrl={note.fileUrl}
              onEdit={openNoteForm}
              onDelete={removeNote}
            />
          ))}
        </div>

        <div className="recent-tasks">
          <div className="dashboard-tasks-heading">
            <h1 className="recent-activity-heading">Your Tasks</h1>
          </div>
          {highPriorityTasks.map((highPriorityTask) => (
            <TasksCard
              key={highPriorityTask._id}
              task={highPriorityTask}
              onEdit={openTaskForm}
              onDelete={removeTask}
              onToggleComplete={toggleTask}
            />
          ))}
          {mediumPriorityTasks.map((mediumPriorityTask) => (
            <TasksCard
              key={mediumPriorityTask._id}
              task={mediumPriorityTask}
              onEdit={openTaskForm}
              onDelete={removeTask}
              onToggleComplete={toggleTask}
            />
          ))}
          {lowPriorityTasks.map((lowPriorityTask) => (
            <TasksCard
              key={lowPriorityTask._id}
              task={lowPriorityTask}
              onEdit={openTaskForm}
              onDelete={removeTask}
              onToggleComplete={toggleTask}
            />
          ))}
        </div>
      </div>

      {editingNote && (
        <div className="dashboard-note-overlay">
          <form className="dashboard-note-form" onSubmit={saveNote}>
            <h2>Edit Note</h2>
            <input
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              required
            />
            <input
              type="file"
              onChange={(event) =>
                setForm({ ...form, file: event.target.files[0] })
              }
              required
            />
            <div>
              <button className="dashboard-note-save" type="submit">
                Save
              </button>
              <button
                className="dashboard-note-cancel"
                type="button"
                onClick={() => setEditingNote(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isTaskFormOpen && (
        <div className="dashboard-task-overlay">
          <form className="dashboard-task-form" onSubmit={saveTask}>
            <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
            <input
              placeholder="Title"
              value={taskForm.title}
              onChange={(event) =>
                setTaskForm({ ...taskForm, title: event.target.value })
              }
              required
            />
            <input
              placeholder="Subject"
              value={taskForm.subject}
              onChange={(event) =>
                setTaskForm({ ...taskForm, subject: event.target.value })
              }
              required
            />
            <input
              type="datetime-local"
              value={taskForm.deadline}
              onChange={(event) =>
                setTaskForm({ ...taskForm, deadline: event.target.value })
              }
              required
            />
            <select
              value={taskForm.priority}
              onChange={(event) =>
                setTaskForm({ ...taskForm, priority: event.target.value })
              }
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <div>
              <button className="dashboard-task-save" type="submit">
                Save
              </button>
              <button
                className="dashboard-task-cancel"
                type="button"
                onClick={() => {
                  setIsTaskFormOpen(false);
                  setEditingTask(null);
                  setTaskForm({
                    title: "",
                    subject: "",
                    deadline: "",
                    priority: "MEDIUM",
                  });
                }}
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
