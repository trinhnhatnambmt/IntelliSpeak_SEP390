import React, { useState, useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetPasswordAPI } from "~/redux/user/userSlice";
import { useLocation } from "react-router-dom";

const SecuritySettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    // Lấy resetToken từ query parameter
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("resetToken");
        if (token) {
            setResetToken(token);
        }
    }, [location]);

    const openResetPasswordModal = () => {
        setNewPassword("");
        setRepeatPassword("");
        setIsModalOpen(true);
    };

    const handleResetPassword = async () => {
        if (!resetToken) {
            toast.error("Please provide a reset token.");
            return;
        }
        if (newPassword !== repeatPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        try {
            await toast.promise(
                dispatch(
                    resetPasswordAPI({
                        resetToken,
                        new_password: newPassword,
                        repeat_password: repeatPassword,
                    })
                ).unwrap(),
                {
                    pending: "Resetting password...",
                    success: "Password reset successfully!",
                    error: "Failed to reset password. Please try again.",
                }
            );
            setIsModalOpen(false);
            setNewPassword("");
            setRepeatPassword("");
        } catch (error) {
            // Lỗi đã được xử lý trong toast.promise
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
                    <Input
                        placeholder="Reset Token"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                        disabled={!!new URLSearchParams(location.search).get("resetToken")}
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
