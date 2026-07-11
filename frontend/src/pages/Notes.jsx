import "../styles/Notes.css";
import useNotes from "../hooks/useNotes";
import NotesCard from "../components/NotesCard";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function Notes() {
    const {notes} = useNotes();
    const {loading} = useContext(AuthContext);

    if(loading){
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
        <div className="notes">
            <div className="notes-heading-div">
            <h1 className="primary-text">My Notes</h1>
            <button className="add-note-btn">+ Add Note</button>
            </div>

        {notes.map((note) => (
            <NotesCard title={note.title} description={note.description} fileUrl={note.fileUrl} />
        ))}
        </div>
    );
}