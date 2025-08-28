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
                            Account Settings
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
                                    Personal Information
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
                                    Password & Security
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab("uploadCV")}
                                    className={`w-full text-left px-4 py-2 rounded font-medium ${
                                        activeTab === "uploadCV"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                                    }`}
                                >
                                    Upload CV
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

export default Settings;
