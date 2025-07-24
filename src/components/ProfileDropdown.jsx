import { useState, useEffect, useRef } from "react";
import {
    Check,
    ChevronUp,
    BarChart3,
    Settings,
    Crown,
    DoorOpen,
    Sun,
    Moon,
    BookOpenText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "~/utils/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";

export default function WalletProfile() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    // console.log(currentUser);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!mounted) {
        return null;
    }

    const handleLogout = () => {
        dispatch(logoutUserAPI());
    };

    const menuItems = [
        {
            icon: <BarChart3 className="w-5 h-5" />,
            label: "Trang cá nhân",
            href: "/main/profile",
        },

        {
            icon: <BookOpenText className="w-5 h-5" />,
            label: "Tạo bài viết",
            href: "/main/newPostPage",
        },
        {
            icon: <Crown className="w-5 h-5" />,
            label: "Nâng cấp pro",
            action: true,
            actionLabel: "Nâng cấp",
            href: "/upgrade-plan",
        },
        {
            icon: <Settings className="w-5 h-5" />,
            label: "Cài đặt",
            href: "/main/settings",
        },

        {
            icon: <DoorOpen className="w-5 h-5" />,
            label: "Đăng xuất",
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <div>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-0 w-80 overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 z-50"
            >
                {/* Profile Header */}
                <motion.div
                    className="py-1 px-6 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200"
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center">
                        <motion.div
                            className="relative w-12 h-12 mr-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <div className="absolute inset-1 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                    <img
                                        className="rounded-full"
                                        alt="Profile Picture"
                                        width={40}
                                        height={40}
                                        src={currentUser?.avatar}
                                    />
                                </div>
                            </div>
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                    {currentUser?.userName}
                                </h2>
                                <motion.div
                                    className="ml-2 flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                    }}
                                >
                                    <Check className="w-3 h-3 text-white" />
                                </motion.div>
                            </div>
                        </div>
                        <motion.button
                            className="text-neutral-500 dark:text-neutral-400 cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronUp className="w-5 h-5" />
                            </motion.div>
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Menu Items */}
                            <div className="p-4 space-y-2 border-b border-neutral-200 dark:border-neutral-700 ">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                            item.danger
                                                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:pl-6"
                                                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:pl-6"
                                        }`}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <Link
                                            to={item.href}
                                            className="flex items-center"
                                            onClick={(e) => {
                                                setIsOpen(false);
                                                if (item.onClick) {
                                                    e.preventDefault(); // Ngăn điều hướng nếu có onClick (ví dụ logout)
                                                    item.onClick();
                                                }
                                            }}
                                        >
                                            <span className="mr-3">
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                        </Link>
                                        {item.action && (
                                            <motion.button
                                                className="px-4 py-1 rounded-md bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-200 dark:bg-[linear-gradient(to_right,_#B2D0F9,_#F08878,_#FDC3B6,_#FFDB9A)] text-black  font-medium text-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {item.actionLabel}
                                            </motion.button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                                <div className="flex bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
                                    <motion.button
                                        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md ${
                                            theme === "light"
                                                ? "bg-white dark:bg-neutral-600 shadow-sm"
                                                : ""
                                        }`}
                                        onClick={() => setTheme("light")}
                                        whileHover={{
                                            scale: theme !== "light" ? 1.03 : 1,
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <Sun
                                            className={`w-4 h-4 mr-2 ${
                                                theme === "light"
                                                    ? "text-amber-500"
                                                    : "text-neutral-500 dark:text-neutral-400"
                                            }`}
                                        />
                                        <span
                                            className={
                                                theme === "light"
                                                    ? "text-neutral-900 dark:text-white font-medium"
                                                    : "text-neutral-500 dark:text-neutral-400"
                                            }
                                        >
                                            Light
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md ${
                                            theme === "dark"
                                                ? "bg-neutral-600 shadow-sm"
                                                : ""
                                        }`}
                                        onClick={() => setTheme("dark")}
                                        whileHover={{
                                            scale: theme !== "dark" ? 1.03 : 1,
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <Moon
                                            className={`w-4 h-4 mr-2 ${
                                                theme === "dark"
                                                    ? "text-indigo-300"
                                                    : "text-neutral-500 dark:text-neutral-400"
                                            }`}
                                        />
                                        <span
                                            className={
                                                theme === "dark"
                                                    ? "text-white font-medium"
                                                    : "text-neutral-500 dark:text-neutral-400"
                                            }
                                        >
                                            Dark
                                        </span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200">
                                <div className="flex items-center">
                                    <motion.div
                                        className="w-6 h-6 mr-2 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center shadow-sm"
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                                fill={"black"}
                                            />
                                            <path
                                                d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                                                fill={"black"}
                                            />
                                        </svg>
                                    </motion.div>
                                    <span className="text-neutral-900 dark:text-white font-medium">
                                        ItelliSpeak
                                    </span>
                                </div>
                                <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    v1.0
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
