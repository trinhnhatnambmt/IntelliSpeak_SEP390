import {
    Sun,
    Moon,
    Home,
    MessageSquareMore,
    Tag,
    Video,
    Trophy,
    BookOpen,
} from "lucide-react";
import React from "react";

const SideBar = () => {
    const NavItem = ({ icon, text, badge, active }) => (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                active
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
            <div className="flex items-center space-x-2">
                {icon}
                <span>{text}</span>
            </div>
            {badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </div>
    );
    return (
        <div>
            <aside className="w-64 h-[fit-content] bg-white dark:bg-[#1e1e2f] p-6  hidden lg:block relative z-10 rounded-2xl">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">🏠 Trang chủ</h2>
                </div>
                <nav className="space-y-2">
                    <NavItem
                        icon={<MessageSquareMore size={18} />}
                        text="DEV++"
                        active
                    />
                    <NavItem
                        icon={<BookOpen size={18} />}
                        text="Reading List"
                        badge={1}
                    />
                    <NavItem icon={<Video size={18} />} text="Videos" />
                    <NavItem icon={<Tag size={18} />} text="Tags" />
                    <NavItem icon={<Trophy size={18} />} text="Challenges" />
                </nav>

                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    Other
                </div>
                <nav className="space-y-2 mt-2">
                    <NavItem text="Code of Conduct" />
                    <NavItem text="About" />
                    <NavItem text="Contact" />
                </nav>
            </aside>
        </div>
    );
};

export default SideBar;
