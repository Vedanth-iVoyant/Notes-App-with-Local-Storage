import { useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { NoteProvider } from "./context/NoteProvider";
import ThemeProvider from "./context/ThemeProvider";
import { NoteEditor } from "./components/NoteEditor";

function App() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  return (
    <>
      <ThemeProvider>
        <NoteProvider>
          <ThemeToggle />
          <Sidebar
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
          />
          <NoteEditor selectedGroupId={selectedGroupId} />
        </NoteProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
