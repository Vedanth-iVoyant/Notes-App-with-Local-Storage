import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
      }}
    >
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
