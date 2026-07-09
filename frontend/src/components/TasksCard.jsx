import "./TasksCard.css";

export default function TasksCard({title,subject,deadline}) {
    return (
        <div className="tasks-card">
            <input type="checkbox" />
            <h2>{title}</h2>
            <p>{subject}    {deadline}</p>
        </div>
    )
}