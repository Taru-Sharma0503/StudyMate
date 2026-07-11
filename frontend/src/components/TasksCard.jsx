import "./TasksCard.css";

export default function TasksCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  return (
    <div className="tasks-card">
      <label>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task)}
        />{" "}
        Mark as Completed
      </label>
      <h2 className={`tasks-card-title ${task.isCompleted ? "completed" : ""}`}>
        {task.title}
      </h2>
      <p className="tasks-card-details">
        {task.subject}
        {" • Due By "}
        {new Date(task.deadline).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      {onEdit && (
        <div className="task-card-actions">
          <button className="task-edit-btn" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button
            className="task-delete-btn"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
