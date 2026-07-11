import { getNotes, createNote, updateNote, deleteNote } from "../api/notes.api";
import { useState, useEffect } from "react";

export default function useNotes() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const get_notes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      console.log(data.message);
      setNotes(data.notes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const create_note = async (title, description, file) => {
    try {
      setLoading(true);
      const data = await createNote(title, description, file);
      console.log(data.message);
      setNotes([...notes, data.note]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const update_note = async (id, title, description, file) => {
    try {
      setLoading(true);
      const data = await updateNote(id, title, description, file);
      console.log(data.message);
      setNotes(notes.map((note) => (note._id === id ? data.note : note)));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const delete_note = async (id) => {
    try {
      setLoading(true);
      const data = await deleteNote(id);
      console.log(data.message);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchNotes() {
      await get_notes();
    }

    fetchNotes();
  }, []);

  return { notes, loading, create_note, update_note, delete_note };
}
