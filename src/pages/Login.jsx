import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          MediSlot
        </h2>

        <input className="w-full p-3 border mb-4 rounded-xl" placeholder="Email" />
        <input className="w-full p-3 border mb-4 rounded-xl" placeholder="Password" />

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}