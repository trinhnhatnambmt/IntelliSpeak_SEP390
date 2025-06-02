import { useState } from "react";
import { AdminLogo } from "./AdminLogo";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

export const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", href: "/admin" },
    { icon: <Users />, label: "Users", href: "/admin/users" },
    { icon: <Package />, label: "Products", href: "/admin/products" },
    { icon: <FileText />, label: "Reports", href: "/admin/reports" },
    { icon: <Settings />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-black shadow-lg transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-20"
        }`}
    >
      <AdminLogo isSidebarOpen={isOpen} toggleSidebar={toggleSidebar} />

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${isOpen ? "justify-start space-x-3" : "justify-center"
                  }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};