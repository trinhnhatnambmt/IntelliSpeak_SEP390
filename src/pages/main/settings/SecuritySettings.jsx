import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetPasswordAPI } from "~/redux/user/userSlice";

const SecuritySettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // Fixed naming
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const openResetPasswordModal = () => {
        setNewPassword("");
        setRepeatPassword("");
        setCurrentPassword("");
        setIsModalOpen(true);
    };

    const handleResetPassword = async () => {
        if (!currentPassword) {
            toast.error("Current password is required.");
            return;
        }
        if (newPassword !== repeatPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Request payload:", { currentPassword, newPassword, repeatPassword });
            await toast.promise(
                dispatch(
                    resetPasswordAPI({
                        currentPassword,
                        newPassword,
                        repeatPassword,
                    })
                ).unwrap(),
                {
                    pending: "Resetting password...",
                    success: "Password reset successfully!",
                    error: (error) => error || "Failed to reset password. Please try again.",
                }
            );
            setIsModalOpen(false);
            setNewPassword("");
            setRepeatPassword("");
            setCurrentPassword("");
        } catch (error) {
            // Error handled by toast.promise
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Password & Security
            </h2>

            <section>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    Login & Recovery
                </h3>
                <div className="space-y-3">
                    <InfoRow
                        label="Set Password"
                        value="Not changed yet"
                        onClick={openResetPasswordModal}
                    />
                    <InfoRow
                        label="Two-factor Authentication"
                        value="Disabled"
                        onClick={() => { }}
                    />
                </div>
            </section>

            <Modal
                title="Reset Password"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleResetPassword}
                        loading={isLoading}
                    >
                        Save
                    </Button>,
                ]}
            >
                <div className="space-y-4">
                    <Input.Password
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} // Fixed setter
                    />
                    <Input.Password
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input.Password
                        placeholder="Confirm New Password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
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

export default SecuritySettings;