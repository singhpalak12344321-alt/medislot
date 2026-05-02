import { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [specialFilter, setSpecialFilter] = useState("All");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.slice(0, 8).map((user, i) => ({
          id: user.id,
          name: "Dr. " + user.name,
          specialization: [
            "Cardiologist",
            "Dermatologist",
            "Neurologist",
            "ENT",
            "Pediatrician",
            "Orthopedic",
          ][i % 6],
          exp: `${5 + i} yrs`,
        }));

        setDoctors(formatted);
        setFiltered(formatted);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (search) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialFilter !== "All") {
      result = result.filter((d) => d.specialization === specialFilter);
    }

    setFiltered(result);
  }, [search, specialFilter, doctors]);

  const confirmBooking = (doc) => {
    const prev = JSON.parse(localStorage.getItem("appointments")) || [];

    const newApp = {
      id: Date.now(),
      name: doc.name,
      specialization: doc.specialization,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };

    localStorage.setItem("appointments", JSON.stringify([...prev, newApp]));

    alert("Appointment Booked Successfully ✅");
    setConfirmId(null);
  };

  if (loading) return <p className="p-6">Loading doctors...</p>;

  return (
    <div className="p-6 text-black dark:text-white">

      <h2 className="text-2xl font-bold mb-4">Doctors</h2>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search doctor..."
          className="
            p-2 border rounded w-full
            bg-white dark:bg-gray-800
            text-black dark:text-white
            border-gray-300 dark:border-gray-600
            placeholder-gray-500 dark:placeholder-gray-400
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* DROPDOWN */}
        <select
          className="
            p-2 border rounded
            bg-white dark:bg-gray-800
            text-black dark:text-white
            border-gray-300 dark:border-gray-600
          "
          value={specialFilter}
          onChange={(e) => setSpecialFilter(e.target.value)}
        >
          <option value="All">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="ENT">ENT</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic">Orthopedic</option>
        </select>

      </div>

      {/* DOCTOR CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow"
          >
            <h3 className="font-bold text-lg">{doc.name}</h3>
            <p className="text-gray-500">{doc.specialization}</p>
            <p className="text-sm">Experience: {doc.exp}</p>

            {confirmId === doc.id ? (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => confirmBooking(doc)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>

                <button
                  onClick={() => setConfirmId(null)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmId(doc.id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Book Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}