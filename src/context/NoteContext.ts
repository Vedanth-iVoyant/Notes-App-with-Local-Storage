import { createContext } from "react";
import type { NoteContextType } from "../types";

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined
);
