import { useEffect, useState } from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">
          Welcome back 👋 Here's what's happening today
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">10+</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Appointments</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {appointments.length}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Patients</p>
          <h3 className="text-3xl font-bold text-purple-600 mt-2">
            {appointments.length}
          </h3>
        </div>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Recent */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Recent Appointments
          </h3>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.specialization}
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent appointments</p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-6">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Book Appointment
            </h3>
            <p className="text-sm mb-4 opacity-90">
              Find doctors and schedule visits
            </p>

            <a
              href="/doctors"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg"
            >
              Explore →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">
              Manage Bookings
            </h3>

            <a
              href="/appointments"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}