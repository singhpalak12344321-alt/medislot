import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 min-w-[16rem] bg-white border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        {children}
        </div>
    </div>
  );
}