import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error("Use Note must be used inside NoteProvider");
  return context;
};
