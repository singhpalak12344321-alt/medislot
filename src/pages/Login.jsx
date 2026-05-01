import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // ❗ Empty validation
    if (!email || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    // ❗ Email format check
    if (!email.includes("@")) {
      alert("Enter valid email 📧");
      return;
    }

    if (isLogin) {
      // LOGIN
      const storedUser = JSON.parse(localStorage.getItem("userData"));

      if (!storedUser) {
        alert("No user found. Please register first ❌");
        return;
      }

      if (
        storedUser.email === email &&
        storedUser.password === password
      ) {
        localStorage.setItem("user", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials ❌");
      }
    } else {
      // REGISTER

      if (password.length < 4) {
        alert("Password must be at least 4 characters 🔐");
        return;
      }

      const newUser = { email, password };

      localStorage.setItem("userData", JSON.stringify(newUser));

      alert("Registered Successfully 🎉");

      // Reset
      setIsLogin(true);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1 font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}