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
        setAvatarPreview(key === 'avatar' ? value : null);
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

            // If uploading avatar and new file exists
            if (editKey === 'avatar' && avatarFile) {
                const uploadedUrls = await uploadImageAPI([avatarFile]);
                if (uploadedUrls.length > 0) {
                    updatedValue = uploadedUrls[0];
                }
            }

            const updatedUser = {
                ...currentUser.user,
                [editKey]: updatedValue
            };

            await toast.promise(dispatch(updateUserAPI(updatedUser)), {
                pending: "Updating...",
                success: "Update successful!",
                error: "Update failed!"
            });

            dispatch(getUserProfileAPI());
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating:", error);
            toast.error("An error occurred while updating");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Personal Information
            </h2>

            {/* ----------- Basic Information ----------- */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Basic Information
                </h3>
                <div className="space-y-3">
                    <InfoRow
                        label="First Name"
                        value={currentUser?.firstName || "Not updated"}
                        onClick={() =>
                            openEditModal(
                                "First Name",
                                "firstName",
                                currentUser?.firstName || ""
                            )
                        }
                    />
                    <InfoRow
                        label="Last Name"
                        value={currentUser?.lastName || "Not updated"}
                        onClick={() =>
                            openEditModal(
                                "Last Name",
                                "lastName",
                                currentUser?.lastName || ""
                            )
                        }
                    />

                    <InfoRow
                        label="Phone Number"
                        value={currentUser?.phone || "Not updated"}
                        onClick={() =>
                            openEditModal(
                                "Phone Number",
                                "phone",
                                currentUser?.phone || ""
                            )
                        }
                    />
                    <InfoRow
                        label="Avatar"
                        value={<Avatar size={45} src={currentUser?.avatar} />}
                        onClick={() =>
                            openEditModal(
                                "Avatar",
                                "avatar",
                                currentUser?.avatar || ""
                            )
                        }
                    />
                </div>
            </section>

            {/* ----------- Social Media ----------- */}
            <section>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Social Media
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
                            value={currentUser?.[key] || "Not updated"}
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

            {/* ----------- Update Modal ----------- */}
            <Modal
                title={`Update ${editLabel}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSave}
                        loading={isUploading}
                    >
                        Save
                    </Button>,
                ]}
            >
                {editKey === 'avatar' ? (
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
                        placeholder={`Enter ${editLabel.toLowerCase()}...`}
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