import { Avatar } from "antd";
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import SecuritySettings from "./SecuritySettings";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] dark:from-[#0e0c15] dark:to-[#0e0c15] p-5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4">
                    <div className="bg-white dark:bg-[#1e1b2e] rounded-lg shadow p-4 relative z-10">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Cài đặt tài khoản
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab("personal")}
                                    className={`w-full text-left px-4 py-2 rounded font-medium ${
                                        activeTab === "personal"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                                    }`}
                                >
                                    Thông tin cá nhân
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`w-full text-left px-4 py-2 rounded font-medium ${
                                        activeTab === "security"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                                    }`}
                                >
                                    Mật khẩu và bảo mật
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Content */}
                <main className="w-full md:w-3/4">
                    <div className="bg-white dark:bg-[#1e1b2e] rounded-lg shadow p-6 relative z-10">
                        {activeTab === "personal" ? (
                            <PersonalInfo />
                        ) : (
                            <SecuritySettings />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

// // Tab 1: Thông tin cá nhân
// const PersonalInfo = () => (
//     <>
//         <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
//             Thông tin cá nhân
//         </h2>

//         <section className="mb-8">
//             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
//                 Thông tin cơ bản
//             </h3>
//             <div className="space-y-3">
//                 <InfoRow label="Họ và tên" value="Nhat Huy Trinh" />
//                 <InfoRow label="Tên người dùng" value="trinhnhathuyk17hcm" />
//                 <InfoRow label="Giới thiệu" value="Chưa cập nhật" />
//                 <InfoRow label="Ảnh đại diện" value={<AvatarInitial />} />
//             </div>
//         </section>

//         <section>
//             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
//                 Thông tin mạng xã hội
//             </h3>
//             <div className="space-y-3">
//                 <InfoRow label="Trang web cá nhân" value="Chưa cập nhật" />
//                 <InfoRow label="GitHub" value="Chưa cập nhật" />
//                 <InfoRow label="LinkedIn" value="Chưa cập nhật" />
//                 <InfoRow label="Facebook" value="Chưa cập nhật" />
//                 <InfoRow label="YouTube" value="Chưa cập nhật" />
//             </div>
//         </section>
//     </>
// );

// // Tab 2: Bảo mật
// const SecuritySettings = () => (
//     <>
//         <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
//             Mật khẩu và bảo mật
//         </h2>

//         <section>
//             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
//                 Đăng nhập & khôi phục
//             </h3>
//             <div className="space-y-3">
//                 <InfoRow label="Tạo mật khẩu" value="Chưa đổi mật khẩu" />
//                 <InfoRow label="Xác minh 2 bước" value="Đang tắt" />
//             </div>
//         </section>
//     </>
// );

// // Dòng hiển thị thông tin
// const InfoRow = ({ label, value }) => (
//     <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//         <div className="text-sm text-gray-800 dark:text-gray-200">{label}</div>
//         <div className="text-sm text-gray-500 dark:text-gray-400">{value}</div>
//     </div>
// );

// // Ảnh đại diện mặc định
// const AvatarInitial = () => (
//     <Avatar
//         src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
//         size="large"
//     />
// );

export default Settings;
