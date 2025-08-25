import React, { useEffect, useState } from "react";
import { getComplaintStatusAPI } from "~/apis";

const Complaint = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getComplaintStatusAPI().then((data) => {
            setComplaints(data);
        });
    }, []);

    const getStatusLabel = (status) => {
        if (status === null) {
            return (
                <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-700">
                    In Progress
                </span>
            );
        }
        if (status === true) {
            return (
                <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                    Resolved
                </span>
            );
        }
        if (status === false) {
            return (
                <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                    Cancelled
                </span>
            );
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Complaints</h1>
            <div className="overflow-x-auto relative z-10">
                <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-black">
                            <th className="px-4 py-2 border-b">Description</th>
                            <th className="px-4 py-2 border-b">Created At</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center py-4 text-gray-500"
                                >
                                    No complaints found
                                </td>
                            </tr>
                        ) : (
                            complaints.map((c) => (
                                <tr
                                    key={c.websiteFeedbackId}
                                >
                                    <td className="px-4 py-2 border-b">
                                        {c.description || (
                                            <i className="text-gray-400">
                                                No description
                                            </i>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {c.createAt}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {getStatusLabel(c.isHandled)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Complaint;
