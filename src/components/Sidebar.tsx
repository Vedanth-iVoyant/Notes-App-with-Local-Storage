import { useNote } from "../hooks/useNote";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";
import add from "../assets/add.svg";
import { useState } from "react";
import type { SidebarProps } from "../types";
import edit from "../assets/edit-svgrepo-com.svg";
import deleteIcon from "../assets/delete.svg";

export function Sidebar({ selectedGroupId, setSelectedGroupId }: SidebarProps) {
  const { noteGroups, setNoteGroups } = useNote();
  const [newName, setNewName] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleAddNoteGroup = () => {
    if (!newName.trim()) return;
    const newGroup = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      notes: [],
    };

    setNoteGroups([...noteGroups, newGroup]);
    setNewName("");
    setShowPopup(false);
  };

  const handleDeleteGroup = (id: string) => {
    const confirmDelete = confirm(
      "Are you sure want to delete this Note group"
    );
    if (!confirmDelete) return;
    const updatedGroup = noteGroups.filter((group) => group.id !== id);
    setNoteGroups(updatedGroup);
  };

  const handleEditGruop = (id: string) => {
    const newName = prompt("Enter new Group name");
    if (!newName?.trim()) return;

    const updatedGroupName = noteGroups.map((group) =>
      group.id === id ? { ...group, name: newName } : group
    );
    setNoteGroups(updatedGroupName);
  };
  return (
    <div className="sidebar">
      <header className="header">
        <img src={logo} alt="logo" />
        <h2>Notes</h2>
        <button onClick={() => setShowPopup(true)}>
          <img src={add} alt="add" />
        </button>
      </header>
      <div></div>
      <main>
        <ul>
          {noteGroups.map((group) => (
            <li
              key={group.id}
              className={selectedGroupId === group.id ? "active" : ""}
            >
              <span onClick={() => setSelectedGroupId(group.id)}>
                {group.name}
              </span>
              <div>
                <img src={edit} onClick={() => handleEditGruop(group.id)} />
                <img
                  src={deleteIcon}
                  onClick={() => handleDeleteGroup(group.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup">
            <h2>Create a New Note Group</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter group name"
            />
            <div className="popup-action">
              <button onClick={handleAddNoteGroup}>Add</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
