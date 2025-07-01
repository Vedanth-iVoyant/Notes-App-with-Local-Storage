import type { Dispatch, SetStateAction } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Note {
  id: string;
  text: string;
  date: string;
  isEdited?: boolean;
  tags?: string[];
  pinned?: boolean;
}

export interface NoteGroup {
  id: string;
  name: string;
  notes: Note[];
  updatedAt?: string;
  archived?: boolean;
  pinned?: boolean;
}

export interface NoteContextType {
  noteGroups: NoteGroup[];
  setNoteGroups: Dispatch<SetStateAction<NoteGroup[]>>;
}

export interface SidebarProps {
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string) => void;
}

export interface NoteEditorProps {
  selectedGroupId: string | null;
}
