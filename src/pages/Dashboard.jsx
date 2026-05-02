import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  // STATUS ANALYTICS 
  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const done = appointments.filter((a) => a.status === "Done").length;

  return (
    <div className="min-h-screen max-w-7xl mx-auto text-black dark:text-white">

      {/* HEADER */}
      <div className="mb-8 mt-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Manage your healthcare easily
        </p>
      </div>

      {/* EXISTING STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Total Doctors</p>
          <h3 className="text-3xl font-bold text-blue-600">10+</h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Appointments</p>
          <h3 className="text-3xl font-bold text-green-600">
            {appointments.length}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Patients</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {appointments.length}
          </h3>
        </div>

      </div>

      {/* STATUS ANALYTICS SECTION */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Total Appointments</p>
          <h3 className="text-3xl font-bold text-blue-500">{total}</h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-500">{pending}</h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500">Completed</p>
          <h3 className="text-3xl font-bold text-green-600">{done}</h3>
        </div>

      </div>

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* RECENT APPOINTMENTS */}
        <div className="md:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">

          <h3 className="text-lg font-semibold mb-4">
            Recent Appointments
          </h3>

          {appointments.length > 0 ? (
            <div className="space-y-4">

              {appointments.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
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

        {/* ACTIONS */}
        <div className="space-y-6">

          <Link
            to="/doctors"
            className="block bg-blue-600 text-white p-6 rounded-2xl shadow"
          >
            Book Appointment
          </Link>

          <Link
            to="/appointments"
            className="block bg-green-600 text-white p-6 rounded-2xl shadow"
          >
            Manage Bookings
          </Link>

        </div>

      </div>
    </div>
  );
}