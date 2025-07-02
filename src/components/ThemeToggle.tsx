import { useTheme } from "../hooks/useTheme";
import "../styles/themeToggle.css";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
