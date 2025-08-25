import React, { useState } from "react";
// import API xóa session nếu có, ví dụ: deleteInterviewSessionAPI

export default function HRDeleteSessionConfirm({
    open,
    session,
    onClose,
    onDeleted,
}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            // TODO: Gọi API xóa session ở đây, ví dụ:
            // await deleteInterviewSessionAPI(session.interviewSessionId);
            if (onDeleted) await onDeleted();
            onClose();
        } catch (err) {
            // TODO: show toast error
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative border border-gray-100 dark:border-neutral-800">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
                    onClick={onClose}
                    disabled={loading}
                >
                    &times;
                </button>
                <h3 className="text-lg font-bold mb-4 text-center text-gray-800 dark:text-white">Delete Interview Template</h3>
                <p className="mb-6 text-center text-gray-700 dark:text-gray-200">
                    Are you sure you want to delete <span className="font-semibold">{session?.title}</span>?
                </p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-white font-semibold rounded-lg transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className={`flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
