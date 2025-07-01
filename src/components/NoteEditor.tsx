import { useNote } from "../hooks/useNote";
import type { NoteEditorProps } from "../types";
import "../styles/note-editor.css";
import { useState } from "react";

export function NoteEditor({ selectedGroupId }: NoteEditorProps) {
  const { noteGroups, setNoteGroups } = useNote();
  const [input, setInput] = useState<string>("");

  if (!selectedGroupId)
    return <div className="note-editor">Select a group to view notes.</div>;

  const groupIndex = noteGroups.findIndex((g) => g.id === selectedGroupId);
  const selectedGroup = noteGroups[groupIndex];
  if (!selectedGroup) return <div className="note-editor">Group Not Found</div>;

  const handleAddNote = () => {
    const newNote = {
      id: crypto.randomUUID,
      text: input.trim(),
      date: new Date().toLocaleDateString(),
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

  return (
    <>
      <div className="note-editor">
        <h2 className="group-name">{selectedGroup.name}</h2>
        {selectedGroup.notes.map((notes) => (
          <div key={notes.id} className="note-item">
            <span>{notes.date}</span>
            <p>{notes.text}</p>
          </div>
        ))}
        <div className="note-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your notes here..."
          />
          <button onClick={handleAddNote}>save</button>
        </div>
      </div>
    </>
  );
}
