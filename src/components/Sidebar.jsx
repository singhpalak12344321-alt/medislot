import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 flex flex-col justify-between border-r dark:border-gray-700">

      <div>
        <h2 className="text-xl font-bold mb-6">MediSlot</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
        </nav>
      </div>

      <div className="space-y-3">

        <button
          onClick={() => setDark(!dark)}
          className="w-full py-2 rounded bg-gray-800 text-white dark:bg-white dark:text-black"
        >
          {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="text-red-500 w-full text-left"
        >
          Logout
        </button>

      </div>

    </div>
  );
}