import { Search, Bell, User, ChevronDown } from "lucide-react";

export const AdminNavbar = ({ isSidebarOpen }) => {
  return (
    <header
      className={`fixed top-0 h-16 bg-gray-800 shadow-sm z-30 transition-all duration-300 ${isSidebarOpen ? "left-64" : "left-20"
        } right-0`}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <span className="ml-2 mr-1">Admin</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
};