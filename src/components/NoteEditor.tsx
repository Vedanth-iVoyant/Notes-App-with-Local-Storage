import { useNote } from "../hooks/useNote";
import type { NoteEditorProps } from "../types";
import "../styles/note-editor.css";
import { useEffect, useRef, useState } from "react";
import edit from "../assets/edit-svgrepo-com.svg";
import deleteIcon from "../assets/delete.svg";

export function NoteEditor({ selectedGroupId }: NoteEditorProps) {
  const { noteGroups, setNoteGroups } = useNote();
  const [input, setInput] = useState<string>("");
  const noteContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noteContainerRef.current) {
      noteContainerRef.current.scrollTop =
        noteContainerRef.current.scrollHeight;
    }
  }, [noteGroups]);

  if (!selectedGroupId) {
    return (
      <div className="note-editor">
        <div className="emptly-state">
          <h2>Welcome to Notes</h2>
          <p>
            Select a group from the sidebar or add a group to start taking notes
          </p>
        </div>
      </div>
    );
  }

  const groupIndex = noteGroups.findIndex((g) => g.id === selectedGroupId);
  const selectedGroup = noteGroups[groupIndex];
  if (!selectedGroup) {
    return (
      <div className="note-editor">
        <div className="emptly-state">
          <h2>Group Not Found</h2>
          <p>The selected group could not be found</p>
        </div>
      </div>
    );
  }
  const handleAddNote = () => {
    if (!input.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      text: input.trim(),
      date: new Date().toISOString(),
    };

    const updatedGroup = {
      ...selectedGroup,
      notes: [...selectedGroup.notes, newNote],
    };

    const updatedGroups = [...noteGroups];
    updatedGroups[groupIndex] = updatedGroup;
    setNoteGroups(updatedGroups);
    setInput("");
  };

  const handleDeleteNote = (id: string) => {
    const confirmDelete = confirm("Are you sure want to detele this note");
    if (!confirmDelete) return;

    const updatedNotes = selectedGroup.notes.filter((note) => note.id !== id);
    const updatedGroup = { ...selectedGroup, notes: updatedNotes };
    const updatedGroups = [...noteGroups];
    updatedGroups[groupIndex] = updatedGroup;
    setNoteGroups(updatedGroups);
  };

  const handleEditNote = (id: string) => {
    const newNote = prompt("Enter your note:");
    if (!newNote?.trim()) return;

    const updatedNote = selectedGroup.notes.map((note) =>
      note.id === id ? { ...note, text: newNote.trim() } : note
    );

    const updatedGroup = { ...selectedGroup, notes: updatedNote };
    const updatedGroups = [...noteGroups];
    updatedGroups[groupIndex] = updatedGroup;
    setNoteGroups(updatedGroups);
  };

  const groupedNotes = selectedGroup.notes.reduce((acc, note) => {
    const date = note.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(note);
    return acc;
  }, {} as Record<string, typeof selectedGroup.notes>);

  const formatNoteDate = (dateStr: string): string => {
    const noteDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    if (isSameDay(noteDate, today)) return "Today";
    if (isSameDay(noteDate, yesterday)) return "Yesterday";

    return noteDate.toLocaleDateString();
  };

  return (
    <div className="note-editor">
      <header className="note-editor-header">
        <h2 className="group-name">{selectedGroup.name}</h2>
      </header>
      <div className="notes-container" ref={noteContainerRef}>
        {selectedGroup.notes.length === 0 ? (
          <div className="empty-state">
            <h2>No notes yet</h2>
            <p>Start by typing your first note bellow</p>
          </div>
        ) : (
          Object.entries(groupedNotes).map(([date, notes]) => (
            <div key={date}>
              <div className="note-date">{formatNoteDate(date)}</div>
              {notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-content">
                    <div className="note-actions">
                      <img src={edit} onClick={() => handleEditNote(note.id)} />
                      <img
                        src={deleteIcon}
                        onClick={() => handleDeleteNote(note.id)}
                      />
                    </div>
                    <div className="note-bubble">
                      <p className="note-text">{note.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="note-input">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your notes here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddNote();
            }}
          />
        </div>
        <button
          onClick={handleAddNote}
          disabled={!input.trim()}
          title="Save note (Enter)"
        >
          save
        </button>
      </div>
    </div>
  );
}
