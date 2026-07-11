import "../styles/Notes.css";
import useNotes from "../hooks/useNotes";
import NotesCard from "../components/NotesCard";

export default function Notes() {
    const {notes} = useNotes();

    return (
        <div className="notes">
            <div className="notes-heading-div">
            <h1 className="primary-text">My Notes</h1>
            <button className="add-note-btn">+ Add Note</button>
            </div>

        {notes.map((note) => (
            <NotesCard key={note._id} title={note.title} description={note.description} fileUrl={note.fileUrl} />
        ))}
        </div>
    );
}