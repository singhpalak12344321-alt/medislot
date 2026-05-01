import { useEffect, useState } from "react";
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
        const enriched = data.map((doc) => ({
          ...doc,
          rating: (Math.random() * 2 + 3).toFixed(1),
          experience: Math.floor(Math.random() * 15) + 1,
          fees: Math.floor(Math.random() * 500) + 300,
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
    alert("Booked Successfully 🎉");
  };

  const filtered = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Doctors</h2>

        <button
          onClick={() => navigate("/appointments")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl">View Appointments →</button>
      </div>

      <input
        className="w-full p-3 border rounded-xl mb-6"
        placeholder="Search doctors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h3 className="text-xl font-bold">{doc.name}</h3>
            <p className="text-gray-500">{doc.company.name}</p>

            <div className="text-sm text-gray-600 my-3">
              <p>⭐ {doc.rating}</p>
              <p>💼 {doc.experience} yrs</p>
              <p>💰 ₹{doc.fees}</p>
            </div>

            {selectedId !== doc.id ? (
              <button
                onClick={() => setSelectedId(doc.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl">Book Appointment</button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleConfirm(doc)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl">Confirm</button>
                
                <button
                  onClick={() => setSelectedId(null)}
                  className="flex-1 bg-gray-300 py-2 rounded-xl"> Cancel</button>
            
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}