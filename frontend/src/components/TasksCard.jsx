import "./TasksCard.css";

export default function TasksCard({
  title,
  subject,
  deadline,
  isCompleted,
}) {
  return (
    <div className="tasks-card">
      <input type="checkbox" checked={isCompleted} /> Mark as Completed

      <h2 className={`tasks-card-title ${isCompleted ? "completed" : ""}`}>
        {title}
      </h2>

      <p className="tasks-card-details">
        {subject}
        {" ● Due By "}
        {new Date(deadline).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
}