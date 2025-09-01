import { Avatar, Progress } from "antd";
import {
    Mail,
    Phone,
    User,
    Calendar,
    ShieldCheck,
    ShieldX,
    LogIn,
    Package,
    TicketCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserProfileAPI } from "~/apis";

const Info = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        getUserProfileAPI().then((data) => {
            console.log(data);
            setUserProfile(data);
        });
    }, []);

    if (!userProfile) return <div>Loading...</div>;

    return (
        <div className="bg-gray-50 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 min-h-screen pt-10 ">
            <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                {/* Left column */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Personal Information */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-xl p-6 shadow-md">
                        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <User size={20} /> Personal Information
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Your account details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">
                                    <User size={16} />
                                </span>
                                <span>
                                    {userProfile.firstName &&
                                    userProfile.lastName
                                        ? `${userProfile.firstName} ${userProfile.lastName}`
                                        : "Full name not updated"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">
                                    <Mail size={16} />
                                </span>
                                <span>
                                    {userProfile.email || "Email not updated"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">
                                    <Phone size={16} />
                                </span>
                                <span>
                                    {userProfile.phone || "Phone not updated"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">
                                    <TicketCheck size={16} />
                                </span>
                                <span>
                                    {userProfile.role || "Role not updated"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">
                                    <Package size={16} />
                                </span>
                                <span>
                                    {userProfile.packageName ||
                                        "Package not updated"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-xl p-6 shadow-md">
                        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <ShieldCheck size={20} /> Account Status
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Security and verification details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                {userProfile.isEmailVerified ? (
                                    <ShieldCheck
                                        className="text-green-500"
                                        size={16}
                                    />
                                ) : (
                                    <ShieldX
                                        className="text-red-500"
                                        size={16}
                                    />
                                )}
                                <span>
                                    Email Verification:{" "}
                                    {userProfile.isEmailVerified
                                        ? "Verified"
                                        : "Not Verified"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {userProfile.isPhoneVerified ? (
                                    <ShieldCheck
                                        className="text-green-500"
                                        size={16}
                                    />
                                ) : (
                                    <ShieldX
                                        className="text-red-500"
                                        size={16}
                                    />
                                )}
                                <span>
                                    Phone Verification:{" "}
                                    {userProfile.isPhoneVerified
                                        ? "Verified"
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>
                                    Account Created:{" "}
                                    {userProfile.createdAt || "Not available"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LogIn size={16} />
                                <span>
                                    Last Sign In:{" "}
                                    {userProfile.lastLogin || "Not available"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Profile card */}
                    <div className="bg-blue-600 text-white rounded-xl p-6 shadow-md flex flex-col items-center">
                        <Avatar size={72} src={userProfile.avatar} />
                        <h2 className="font-bold text-lg mt-4">{`${
                            userProfile.firstName || ""
                        } ${userProfile.lastName || ""}`}</h2>
                        <p className="text-sm">{userProfile.email}</p>
                        <div className="mt-4 text-sm flex items-center gap-2">
                            <Calendar size={16} />
                            <span>
                                Member since {userProfile.createdAt || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Credit Usage */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-xl p-6 shadow-md">
                        <h2 className="font-bold text-lg mb-2">Credit Usage</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Your remaining and used credits
                        </p>

                        {/* CV Analyze */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-green-600">
                                    {userProfile.cvAnalyzeUsed || 0} CV
                                    Remaining
                                </span>
                            </div>
                            <Progress
                                percent={Math.round(
                                    ((userProfile.cvAnalyzeUsed || 0) / 30) *
                                        100
                                )}
                                size="small"
                                format={(percent) => (
                                    <span style={{ color: "white" }}>
                                        {percent}%
                                    </span>
                                )}
                            />
                        </div>

                        {/* JD Analyze */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-green-600">
                                    {userProfile.jdAnalyzeUsed || 0} JD
                                    Remaining
                                </span>
                            </div>
                            <Progress
                                percent={Math.round(
                                    ((userProfile.jdAnalyzeUsed || 0) / 30) *
                                        100
                                )}
                                size="small"
                                format={(percent) => (
                                    <span style={{ color: "white" }}>
                                        {percent}%
                                    </span>
                                )}
                            />
                        </div>

                        {/* Interview Analyze */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-green-600">
                                    {userProfile.interviewUsed || 0} Interview
                                    Remaining
                                </span>
                            </div>
                            <Progress
                                percent={Math.round(
                                    ((userProfile.interviewUsed || 0) / 30) *
                                        100
                                )}
                                size="small"
                                strokeColor="#4caf50" // màu progress bar
                                format={(percent) => (
                                    <span style={{ color: "white" }}>
                                        {percent}%
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
