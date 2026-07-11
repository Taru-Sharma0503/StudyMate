import "../styles/Notes.css";
import useNotes from "../hooks/useNotes";
import NotesCard from "../components/NotesCard";
import { useState } from "react";

export default function Notes() {
    const {notes, create_note, update_note, delete_note} = useNotes();
    const [editingNote, setEditingNote] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", file: null });

    function openForm(note = null) {
        setEditingNote(note);
        setForm({ title: note?.title || "", description: note?.description || "", file: null });
        setIsFormOpen(true);
    }

    async function saveNote(event) {
        event.preventDefault();
        if (!form.file) return;

        if (editingNote) {
            await update_note(editingNote.id, form.title, form.description, form.file);
        } else {
            await create_note(form.title, form.description, form.file);
        }
        setIsFormOpen(false);
        setEditingNote(null);
        setForm({ title: "", description: "", file: null });
    }

    async function removeNote(id) {
        if (window.confirm("Delete this note?")) await delete_note(id);
    }

    return (
        <div className="notes">
            <div className="notes-heading-div">
            <h1 className="primary-text">My Notes</h1>
            <button className="add-note-btn" onClick={() => openForm()}>+ Add Note</button>
            </div>

        {notes.map((note) => (
            <NotesCard key={note._id} id={note._id} title={note.title} description={note.description} fileUrl={note.fileUrl} onEdit={openForm} onDelete={removeNote} />
        ))}

        {isFormOpen && (
            <div className="note-form-overlay">
                <form className="note-form" onSubmit={saveNote}>
                    <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
                    <input placeholder="Title" value={form.title} onChange={(event) => setForm({...form, title: event.target.value})} required />
                    <textarea placeholder="Description" value={form.description} onChange={(event) => setForm({...form, description: event.target.value})} required />
                    <input type="file" onChange={(event) => setForm({...form, file: event.target.files[0]})} required/>
                    <div>
                        <button className="note-save-btn" type="submit">Save</button>
                        <button className="note-cancel-btn" type="button" onClick={() => { setIsFormOpen(false); setEditingNote(null); setForm({ title: "", description: "", file: null }); }}>Cancel</button>
                    </div>
                </form>
            </div>
        )}
        </div>
    );
}
