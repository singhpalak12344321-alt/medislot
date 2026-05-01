import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Doctors", path: "/doctors", icon: "👨‍⚕️" },
    { name: "Appointments", path: "/appointments", icon: "📅" },
  ];

  return (
    <div className="h-screen p-5 bg-white border-r flex flex-col">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        MediSlot
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom section */}
      <div className="mt-auto text-sm text-gray-400">
        <p>© MediSlot</p>
      </div>

    </div>
  );
}