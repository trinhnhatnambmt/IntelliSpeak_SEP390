import React, { useState } from "react";
import { Avatar, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserProfileAPI,
    selectCurrentUser,
    updateUserAPI,
} from "~/redux/user/userSlice";
import { toast } from "react-toastify";
import { uploadImageAPI } from "~/apis/index";

const PersonalInfo = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLabel, setEditLabel] = useState("");
    const [editKey, setEditKey] = useState("");
    const [editValue, setEditValue] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();

    const openEditModal = (label, key, value) => {
        setEditLabel(label);
        setEditKey(key);
        setEditValue(value);
        setAvatarPreview(key === "avatar" ? value : null);
        setAvatarFile(null);
        setIsModalOpen(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setAvatarFile(file);
        }
    };

    const handleSave = async () => {
        try {
            setIsUploading(true);

            let updatedValue = editValue;

            // Nếu là upload avatar và có file mới
            if (editKey === "avatar" && avatarFile) {
                const uploadedUrls = await uploadImageAPI([avatarFile]);
                if (uploadedUrls.length > 0) {
                    updatedValue = uploadedUrls[0];
                }
            }

            const updatedUser = {
                ...currentUser.user,
                [editKey]: updatedValue,
            };

            await toast.promise(dispatch(updateUserAPI(updatedUser)), {
                pending: "Đang cập nhật...",
                success: "Cập nhật thành công!",
                error: "Cập nhật thất bại!",
            });

            dispatch(getUserProfileAPI());
            setIsModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            toast.error("Có lỗi xảy ra khi cập nhật");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Thông tin cá nhân
            </h2>

            {/* ----------- Thông tin cơ bản ----------- */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Thông tin cơ bản
                </h3>
                <div className="space-y-3">
                    <InfoRow
                        label="Họ"
                        value={currentUser?.firstName || "Chưa cập nhật"}
                        onClick={() =>
                            openEditModal(
                                "Họ",
                                "firstName",
                                currentUser?.firstName || ""
                            )
                        }
                    />
                    <InfoRow
                        label="Tên"
                        value={currentUser?.lastName || "Chưa cập nhật"}
                        onClick={() =>
                            openEditModal(
                                "Tên",
                                "lastName",
                                currentUser?.lastName || ""
                            )
                        }
                    />

                    <InfoRow
                        label="Số điện thoại"
                        value={currentUser?.phone || "Chưa cập nhật"}
                        onClick={() =>
                            openEditModal(
                                "Số điện thoại",
                                "phone",
                                currentUser?.phone || ""
                            )
                        }
                    />
                    <InfoRow
                        label="Ảnh đại diện"
                        value={<Avatar size={45} src={currentUser?.avatar} />}
                        onClick={() =>
                            openEditModal(
                                "Ảnh đại diện",
                                "avatar",
                                currentUser?.avatar || ""
                            )
                        }
                    />
                </div>
            </section>

            {/* ----------- Mạng xã hội ----------- */}
            <section>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Thông tin mạng xã hội
                </h3>
                <div className="space-y-3">
                    {[
                        "website",
                        "github",
                        "linkedin",
                        "facebook",
                        "youtube",
                    ].map((key) => (
                        <InfoRow
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={currentUser?.[key] || "Chưa cập nhật"}
                            onClick={() =>
                                openEditModal(
                                    key.charAt(0).toUpperCase() + key.slice(1),
                                    key,
                                    currentUser?.[key] || ""
                                )
                            }
                        />
                    ))}
                </div>
            </section>

            {/* ----------- Modal cập nhật ----------- */}
            <Modal
                title={`Cập nhật ${editLabel}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSave}
                        loading={isUploading}
                    >
                        Lưu lại
                    </Button>,
                ]}
            >
                {editKey === "avatar" ? (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer dark:file:bg-blue-500 dark:hover:file:bg-blue-600 mb-4"
                        />
                        {avatarPreview && (
                            <div className="mt-4 flex justify-center">
                                <Avatar
                                    size={128}
                                    src={avatarPreview}
                                    className="border border-gray-300 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <Input
                        placeholder={`Nhập ${editLabel.toLowerCase()}...`}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                )}
            </Modal>
        </div>
    );
};

const InfoRow = ({ label, value, onClick }) => (
    <div
        onClick={onClick}
        className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    >
        <div className="text-sm text-gray-800 dark:text-gray-200">{label}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{value}</div>
    </div>
);

export default PersonalInfo;
