import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/DoctorsPage";
import Appointments from "./pages/Appointments";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>

        {/* Login (no sidebar) */}
        <Route path="/" element={<Login />} />

        {/* Pages with sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/doctors"
          element={
            <Layout>
              <Doctors />
            </Layout>
          }
        />

        <Route
          path="/appointments"
          element={
            <Layout>
              <Appointments />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;