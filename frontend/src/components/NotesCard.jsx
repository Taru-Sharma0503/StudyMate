import "./NotesCard.css";

export default function NotesCard({ id, title, description, fileUrl, onEdit, onDelete }) {

  return (
    <div className="notes-card">
      <a href={fileUrl} target="_blank" className="notes-card-title">
        {title}
      </a>
      <p className="notes-card-description">{description}</p>
      <div className="notes-card-functionality">
        <button className="notes-card-btn edit-note-btn" onClick={() => onEdit({ id, title, description })}>
          Edit
        </button>
        <button className="notes-card-btn delete-note-btn" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
