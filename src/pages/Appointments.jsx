import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];

    
    const enriched = data.map((a) => ({
      ...a,
      status: "Confirmed",
    }));

    setAppointments(enriched);
  }, []);

  const handleCancel = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleComplete = (id) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "Completed" } : a
    );
    setAppointments(updated);
  };

  const filtered = appointments.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto">

      
      <h2 className="text-3xl font-bold mb-6">Appointments</h2>

      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total</p>
          <h3 className="text-2xl font-bold">{appointments.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Today</p>
          <h3 className="text-2xl font-bold">
            {appointments.filter((a) => a.date === today).length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Completed</p>
          <h3 className="text-2xl font-bold">
            {appointments.filter((a) => a.status === "Completed").length}
          </h3>
        </div>
      </div>

      
      <input
        className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-400"
        placeholder="Search appointments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold">{item.name}</h3>

              <p className="text-gray-500">{item.specialization}</p>

              <p className="text-gray-400 text-sm mb-3">
                📅 {item.date}
              </p>

              
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>

          
              <div className="flex gap-3 mt-4">
                {item.status !== "Completed" && (
                  <button
                    onClick={() => handleComplete(item.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                  >
                    Mark Done
                  </button>
                )}

                <button
                  onClick={() => handleCancel(item.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No appointments yet 
          </p>
        </div>
      )}
    </div>
  );
}