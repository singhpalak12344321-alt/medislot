import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // Enhance data
        const enriched = data.map((doc) => ({
          ...doc,
          rating: (Math.random() * 2 + 3).toFixed(1), // 3–5
          experience: Math.floor(Math.random() * 15) + 1,
          fees: Math.floor(Math.random() * 500) + 300,
          available: Math.random() > 0.3,
        }));
        setDoctors(enriched);
      });
  }, []);

  const handleConfirm = (doc) => {
    const newAppointment = {
      id: Date.now(),
      name: doc.name,
      specialization: doc.company.name,
      date: new Date().toLocaleDateString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("appointments")) || [];

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, newAppointment])
    );

    setSelectedId(null);
    toast.success("Appointment booked successfully!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      }
    });
    toast.error("Appointment cancelled.");
    toast("Marked as completed.", { icon: "✅" });
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Find Doctors</h2>

        <button
          onClick={() => navigate("/appointments")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700"
        >
          My Appointments →
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-400"
        placeholder="Search doctors by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://i.pravatar.cc/150?img=${doc.id}`}
                alt="doc"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">{doc.name}</h3>
                <p className="text-gray-500 text-sm">
                  {doc.company.name}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>⭐ Rating: {doc.rating}</p>
              <p>💼 Experience: {doc.experience} years</p>
              <p>📍 Location: {doc.address.city}</p>
              <p>💰 Fees: ₹{doc.fees}</p>
            </div>

            {/* Availability */}
            <div className="mb-4">
              {doc.available ? (
                <span className="text-green-600 text-sm font-medium">
                  🟢 Available Today
                </span>
              ) : (
                <span className="text-red-500 text-sm font-medium">
                  🔴 Not Available
                </span>
              )}
            </div>

            {/* Buttons */}
            {selectedId !== doc.id ? (
              <button
                onClick={() => setSelectedId(doc.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Book Appointment
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleConfirm(doc)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl"
                >
                  Confirm
                </button>

                <button
                  onClick={() => setSelectedId(null)}
                  className="flex-1 bg-gray-300 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}