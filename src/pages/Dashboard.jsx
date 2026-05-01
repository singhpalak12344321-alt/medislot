import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8 mt-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Manage your healthcare easily</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <h3 className="text-3xl font-bold text-blue-600">10+</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Appointments</p>
          <h3 className="text-3xl font-bold text-green-600">
            {appointments.length}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Patients</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {appointments.length}
          </h3>
        </div>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Recent Appointments */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Recent Appointments
          </h3>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.specialization}
                    </p>
                  </div>

                  <span className="text-gray-400 text-sm">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointments yet</p>
          )}
        </div>

        {/* ACTION CARDS (FULL CLICKABLE) */}
        <div className="space-y-6">

          {/* Doctors */}
          <Link
            to="/doctors"
            className="block bg-blue-600 text-white p-6 rounded-2xl shadow hover:scale-[1.02] transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              Book Appointment
            </h3>
            <p className="text-sm opacity-90">
              Explore doctors →
            </p>
          </Link>

          {/* Appointments */}
          <Link
            to="/appointments"
            className="block bg-green-600 text-white p-6 rounded-2xl shadow hover:scale-[1.02] transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              Manage Bookings
            </h3>
            <p className="text-sm opacity-90">
              View appointments →
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}