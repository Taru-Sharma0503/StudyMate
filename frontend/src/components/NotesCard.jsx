import "./NotesCard.css";

export default function NotesCard({ title, description, fileUrl }) {
  return (
    <div>
      <Link to={fileUrl}>{title}</Link>
      <p>{description}</p>
    </div>
  );
}
