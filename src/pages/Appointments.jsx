import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  // 🔥 FIXED STATUS UPDATE
  const updateStatus = (id, status) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    showPopup(`Appointment marked as ${status} ✅`);
  };

  // 🔥 FIXED REMOVE
  const remove = (id) => {
    const updated = appointments.filter((a) => a.id !== id);

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    showPopup("Appointment cancelled ❌");
  };

  // 🎯 POPUP HANDLER
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => {
      setPopup(null);
    }, 2000);
  };

  return (
    <div className="p-6 text-black dark:text-white relative">

      <h2 className="text-2xl mb-6 font-bold">Appointments</h2>

      {/* 🔔 POPUP NOTIFICATION */}
      {popup && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          {popup}
        </div>
      )}

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

                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={
                      a.status === "Done"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {a.status}
                  </span>
                </p>
              </div>

              {/* 👇 BUTTONS DISAPPEAR AFTER ACTION */}
              {a.status !== "Done" ? (
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
              ) : (
                <span className="text-sm text-gray-500">
                  Completed ✔
                </span>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}