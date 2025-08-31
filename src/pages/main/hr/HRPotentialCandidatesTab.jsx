import React, { useState, useEffect } from "react";
import { getHrSubmittedCvAPI, approveCvAPI, rejectCvAPI } from "~/apis/index";
import { toast } from "react-toastify";
import CustomModal from "../../../components/CustomModal"; // Adjusted import path

export default function HRPotentialCandidatesTab() {
    const [search, setSearch] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [showCVModal, setShowCVModal] = useState(false);
    const [cvImgUrls, setCVImgUrls] = useState([]);
    const [cvTitle, setCvTitle] = useState("");
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark');

    // Fetch submitted CVs from API
    const fetchCandidates = async () => {
        setIsLoading(true);
        try {
            const res = await getHrSubmittedCvAPI();
            const candidatesData = res.data.map((cv, index) => {
                const cvLinks = cv.memberCvLinkToCv.split(";").filter(url => url);
                const firstCvLink = cvLinks[0] || "https://via.placeholder.com/600x800?text=CV+Preview";

                return {
                    id: cv.cvSubmissionId || index + 1,
                    submissionId: cv.cvSubmissionId,
                    name: cv.userName || cv.userEmail.split("@")[0].replace(/\./g, " "),
                    email: cv.userEmail,
                    phone: cv.userPhone || "N/A",
                    position: cv.jobTitle || "N/A",
                    cvFile: cv.memberCvTitle || "CV File",
                    cvImg: firstCvLink,
                    cvLinks: cvLinks,
                    cvTitle: cv.memberCvTitle || "Untitled CV",
                    note: cv.isViewed === null ? "Not Viewed" : cv.isViewed ? "Accepted" : "Rejected",
                };
            });
            setCandidates(candidatesData);
        } catch (error) {
            console.error("Error fetching submitted CVs:", error);
            toast.error("Failed to fetch candidates");
            setCandidates([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Approve CV
    const handleApprove = async (submissionId) => {
        setIsActionLoading(true);
        try {
            await approveCvAPI(submissionId);
            await fetchCandidates(); // Refresh list
        } catch (error) {
            // Error handling is already in approveCvAPI
        } finally {
            setIsActionLoading(false);
        }
    };

    // Reject CV
    const handleReject = async (submissionId) => {
        setIsActionLoading(true);
        try {
            await rejectCvAPI(submissionId);
            await fetchCandidates(); // Refresh list
        } catch (error) {
            // Error handling is already in rejectCvAPI
        } finally {
            setIsActionLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchCandidates();
    }, []);

    // Filter candidates based on search term
    const filtered = candidates.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.position.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 text-gray-900 dark:text-gray-100">
            <h3 className="text-xl font-semibold">Potential Candidates</h3>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full md:w-1/2 px-3 py-2 border rounded-md bg-white dark:bg-[#23232a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search by name, email, or position..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No candidates found.</div>
            ) : (
                <ul className="space-y-3">
                    {filtered.map(candidate => (
                        <li
                            key={candidate.id}
                            className="p-4 border rounded-lg bg-white dark:bg-[#23232a] border-gray-200 dark:border-[#333] flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                            <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{candidate.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.position}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {candidate.email} | {candidate.phone}
                                </div>
                                {candidate.note && (
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{candidate.note}</div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-md text-xs hover:bg-blue-600 dark:hover:bg-blue-700"
                                    onClick={() => {
                                        setCVImgUrls(candidate.cvLinks);
                                        setCvTitle(candidate.cvTitle);
                                        setSelectedSubmissionId(candidate.submissionId);
                                        setShowCVModal(true);
                                    }}
                                >
                                    View CV
                                </button>
                                <button
                                    className={`px-2 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700 ${isActionLoading || candidate.note !== "Not Viewed" ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleApprove(candidate.submissionId)}
                                    disabled={isActionLoading || candidate.note !== "Not Viewed"}
                                >
                                    Approve
                                </button>
                                <button
                                    className={`px-2 py-1 text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-700 ${isActionLoading || candidate.note !== "Not Viewed" ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleReject(candidate.submissionId)}
                                    disabled={isActionLoading || candidate.note !== "Not Viewed"}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <CustomModal
                open={showCVModal}
                onClose={() => setShowCVModal(false)}
                title={<span className="text-xl font-bold text-gray-800 dark:text-white">Candidate CV</span>}
                backgroundColor={isDark ? '#111112' : '#fff'}
                className="dark:bg-[#23232a]"
                bodyStyle={{ padding: "1rem", overflowY: "auto" }}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">CV Title: {cvTitle}</h3>
                        {selectedSubmissionId && (
                            <div className="flex gap-3">
                                <button
                                    className={`px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded text-xs hover:bg-green-200 dark:hover:bg-green-700 ${isActionLoading || candidates.find(c => c.submissionId === selectedSubmissionId)?.note !== "Not Viewed" ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleApprove(selectedSubmissionId)}
                                    disabled={isActionLoading || candidates.find(c => c.submissionId === selectedSubmissionId)?.note !== "Not Viewed"}
                                >
                                    Approve
                                </button>
                                <button
                                    className={`px-3 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 rounded text-xs hover:bg-red-200 dark:hover:bg-red-700 ${isActionLoading || candidates.find(c => c.submissionId === selectedSubmissionId)?.note !== "Not Viewed" ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleReject(selectedSubmissionId)}
                                    disabled={isActionLoading || candidates.find(c => c.submissionId === selectedSubmissionId)?.note !== "Not Viewed"}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                    {cvImgUrls.length > 0 ? (
                        cvImgUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Candidate CV ${index + 1}`}
                                className="rounded border border-gray-200 dark:border-[#333]"
                                style={{ width: "100%", objectFit: "contain" }}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center">No CV available</p>
                    )}
                </div>
            </CustomModal>
        </div>
    );
}