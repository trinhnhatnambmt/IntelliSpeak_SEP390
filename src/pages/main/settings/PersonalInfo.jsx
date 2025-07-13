import { Avatar } from "antd";
import React from "react";

const PersonalInfo = () => {
    return (
        <div>
            {" "}
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Thông tin cá nhân
            </h2>
            <section className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Thông tin cơ bản
                </h3>
                <div className="space-y-3">
                    <InfoRow label="Họ và tên" value="Nhat Huy Trinh" />
                    <InfoRow
                        label="Tên người dùng"
                        value="trinhnhathuyk17hcm"
                    />
                    <InfoRow label="Giới thiệu" value="Chưa cập nhật" />
                    <InfoRow label="Ảnh đại diện" value={<AvatarInitial />} />
                </div>
            </section>
            <section>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Thông tin mạng xã hội
                </h3>
                <div className="space-y-3">
                    <InfoRow label="Trang web cá nhân" value="Chưa cập nhật" />
                    <InfoRow label="GitHub" value="Chưa cập nhật" />
                    <InfoRow label="LinkedIn" value="Chưa cập nhật" />
                    <InfoRow label="Facebook" value="Chưa cập nhật" />
                    <InfoRow label="YouTube" value="Chưa cập nhật" />
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

const AvatarInitial = () => (
    <Avatar
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        size="large"
    />
);

export default PersonalInfo;
