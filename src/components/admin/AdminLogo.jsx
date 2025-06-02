import { logo, squarelogo } from "~/assets";

export const AdminLogo = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        {isSidebarOpen ? (
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        ) : (
          <img src={squarelogo} alt="Menu" className="h-10 w-auto " />
        )}
      </button>
    </div>
  );
};