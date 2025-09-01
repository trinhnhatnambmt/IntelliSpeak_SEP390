import { Popconfirm } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteInterviewSessionFromHrAPI, getDetailSessionAPI } from "~/apis";

export default function HRInterviewTemplateTab({
    mySessions,
    sessionSearchTerm,
    setSessionSearchTerm,
    fetchMySessions,
    setShowTemplateModal,
    setOpenSessionMenuId,
    openSessionMenuId,
    setEditSessionModal,
}) {
    const navigate = useNavigate();

    const handleDeleteInterviewSession = (id) => {
        deleteInterviewSessionFromHrAPI(id).then((res) => {
            if (!res.error) {
                toast.success(res?.message);
                fetchMySessions();
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Header + actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold">
                    My Interview Templates
                </h3>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search sessions..."
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                        value={sessionSearchTerm}
                        onChange={(e) => setSessionSearchTerm(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={fetchMySessions}
                            className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-md text-sm"
                        >
                            Refresh
                        </button>
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                            onClick={() => setShowTemplateModal(true)}
                        >
                            Create a new template
                        </button>
                    </div>
                </div>
            </div>
            {/* Danh sách session */}
            {!Array.isArray(mySessions) || mySessions.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                        You have not created any interview sessions yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {mySessions
                        .filter((session) =>
                            session.title
                                ?.toLowerCase()
                                .includes(sessionSearchTerm.toLowerCase())
                        )
                        .map((session) => (
                            <div
                                key={session.interviewSessionId}
                                className="relative flex gap-4 items-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4"
                            >
                                {session.interviewSessionThumbnail && (
                                    <img
                                        src={session.interviewSessionThumbnail}
                                        alt="Template Thumbnail"
                                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-neutral-800"
                                    />
                                )}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        {session.title}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">
                                        {session.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                                        <span className="px-2 py-1 bg-gray-50 dark:bg-neutral-800 rounded text-xs text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700">
                                            Questions:{" "}
                                            {session.totalQuestion}
                                        </span>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full border ${session.difficulty === "EASY"
                                                    ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-200"
                                                    : session.difficulty ===
                                                        "MEDIUM"
                                                        ? "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : "bg-red-50 text-red-700 border-red-100 dark:bg-red-900 dark:text-red-200"
                                                }`}
                                        >
                                            {session.difficulty.charAt(0) +
                                                session.difficulty
                                                    .slice(1)
                                                    .toLowerCase()}
                                        </span>
                                        {Array.isArray(session.tags) &&
                                            session.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {session.tags.map((tag) => (
                                                        <span
                                                            key={tag.tagId}
                                                            className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full border border-blue-100 dark:border-blue-800"
                                                        >
                                                            {tag.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                {/* 3 chấm menu */}
                                <div className="absolute top-4 right-4">
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                                        onClick={() =>
                                            setOpenSessionMenuId(
                                                openSessionMenuId ===
                                                    session.interviewSessionId
                                                    ? null
                                                    : session.interviewSessionId
                                            )
                                        }
                                    >
                                        <span className="text-xl text-gray-500 dark:text-gray-300">
                                            ⋮
                                        </span>
                                    </button>
                                    {openSessionMenuId ===
                                        session.interviewSessionId && (
                                            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-lg z-10 py-2">
                                                <button
                                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded transition"
                                                    onClick={() => {
                                                        console.log(mySessions);
                                                        navigate(
                                                            `/main/interviewSessionDetail/${session.interviewSessionId}`
                                                        );
                                                    }}
                                                >
                                                    Detail
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded transition"
                                                    onClick={() => {
                                                        setOpenSessionMenuId(null);
                                                        setEditSessionModal({
                                                            open: true,
                                                            session,
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <Popconfirm
                                                    title="Delete interview session"
                                                    description="Are you sure to delete this  interview session?"
                                                    onConfirm={() =>
                                                        handleDeleteInterviewSession(
                                                            session.interviewSessionId
                                                        )
                                                    }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded transition">
                                                        Delete
                                                    </button>
                                                </Popconfirm>
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
