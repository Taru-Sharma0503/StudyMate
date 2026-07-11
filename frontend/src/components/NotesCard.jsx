import "./NotesCard.css";

export default function NotesCard({key, title, description, fileUrl }) {

  function editNote() {
    const id=key;
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote() {
    const id=key;
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="notes-card">
      <a href={fileUrl} target="_blank" className="notes-card-title">
        {title}
      </a>
      <p className="notes-card-description">{description}</p>
      <div className="notes-card-functionality">
        <button className="notes-card-btn" onClick={editNote}>
          Edit
        </button>
        <button className="notes-card-btn" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}
