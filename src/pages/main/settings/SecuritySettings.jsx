import React from "react";

const SecuritySettings = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Mật khẩu và bảo mật
            </h2>

            <section>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Đăng nhập & khôi phục
                </h3>
                <div className="space-y-3">
                    <InfoRow label="Tạo mật khẩu" value="Chưa đổi mật khẩu" />
                    <InfoRow label="Xác minh 2 bước" value="Đang tắt" />
                </div>
            </section>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
        <div className="text-sm text-gray-800 dark:text-gray-200">{label}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{value}</div>
    </div>
);

export default SecuritySettings;
