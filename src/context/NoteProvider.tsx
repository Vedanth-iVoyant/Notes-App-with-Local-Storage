import { useEffect, useState, type ReactNode } from "react";
import type { NoteGroup } from "../types";
import { NoteContext } from "./NoteContext";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [noteGroups, setNoteGroups] = useState<NoteGroup[]>(() => {
    const stored = localStorage.getItem("note-data");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("note-data", JSON.stringify(noteGroups));
  }, [noteGroups]);

  return (
    <>
      <NoteContext value={{ noteGroups, setNoteGroups }}>
        {children}
      </NoteContext>
    </>
  );
};
