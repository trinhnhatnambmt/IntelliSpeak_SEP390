import React, { useState } from "react";
import { Avatar, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserProfileAPI,
    selectCurrentUser,
    updateUserAPI,
} from "~/redux/user/userSlice";
import { toast } from "react-toastify";

const PersonalInfo = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLabel, setEditLabel] = useState("");
    const [editKey, setEditKey] = useState("");
    const [editValue, setEditValue] = useState("");

    const openEditModal = (label, key, value) => {
        setEditLabel(label);
        setEditKey(key);
        setEditValue(value);
        setIsModalOpen(true);
    };

    const dispatch = useDispatch();

    const handleSave = () => {
        const updatedUser = { ...currentUser.user };

        updatedUser[editKey] = editValue;

        toast
            .promise(dispatch(updateUserAPI(updatedUser)), {
                pending: "Đang cập nhật...",
            })
            .then((res) => {
                if (!res.error) {
                    toast.success("Cập nhật thành công!");
                }
                dispatch(getUserProfileAPI());
            });

        setIsModalOpen(false);
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
                    <Button key="submit" type="primary" onClick={handleSave}>
                        Lưu lại
                    </Button>,
                ]}
            >
                <Input
                    placeholder={`Nhập ${editLabel.toLowerCase()}...`}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                />
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
