import "./NotesCard.css";
import { Link } from "react-router-dom";

export default function NotesCard({ title, description, fileUrl }) {
  return (
    <div className="notes-card">
      <Link to={fileUrl}>{title}</Link>
      <p>{description}</p>
    </div>
  );
}
