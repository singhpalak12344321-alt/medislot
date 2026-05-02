import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const updateStatus = (id, status) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const remove = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="p-6 text-black dark:text-white">
      <h2 className="text-2xl mb-6 font-bold">Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{a.name}</p>
                <p>{a.specialization}</p>
                <p className="text-sm">{a.date}</p>
                <p className="text-sm">Status: {a.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(a.id, "Done")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Done
                </button>

                <button
                  onClick={() => remove(a.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}