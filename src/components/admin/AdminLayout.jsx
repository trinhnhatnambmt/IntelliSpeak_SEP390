import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar isSidebarOpen={isSidebarOpen} />

        <main className={`flex-1 overflow-y-auto p-6 mt-16 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"
          }`}>
          {/* Thay children bằng Outlet */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};