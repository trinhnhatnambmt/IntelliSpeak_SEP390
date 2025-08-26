import React, { useState } from "react";

const demoCandidates = [
    {
        id: 1,
        name: "Nguyen Van A",
        email: "a.nguyen@email.com",
        phone: "0901234567",
        position: "Frontend Developer",
        cvFile: "NguyenVanA_CV.pdf",
        cvUrl: "#",
        cvImg: "https://via.placeholder.com/600x800?text=CV+Nguyen+Van+A",
        note: "React, JavaScript, HTML, CSS"
    },
    {
        id: 2,
        name: "Tran Thi B",
        email: "b.tran@email.com",
        phone: "0912345678",
        position: "Backend Developer",
        cvFile: "TranThiB_CV.pdf",
        cvUrl: "#",
        cvImg: "https://via.placeholder.com/600x800?text=CV+Tran+Thi+B",
        note: "NodeJS, MongoDB, REST API"
    }
];

export default function HRPotentialCandidatesTab() {
    const [search, setSearch] = useState("");
    const [candidates, setCandidates] = useState(demoCandidates);
    const [showCVModal, setShowCVModal] = useState(false);
    const [cvImgUrl, setCVImgUrl] = useState("");

    const filtered = candidates.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.position.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Potential Candidates</h3>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full md:w-1/2 px-3 py-2 border rounded-md dark:bg-neutral-900 dark:border-neutral-700"
                    placeholder="Search by name, email, or position..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {filtered.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No candidates found.</div>
            ) : (
                <ul className="space-y-3">
                    {filtered.map(candidate => (
                        <li key={candidate.id} className="p-4 border rounded-lg bg-white dark:bg-neutral-900 dark:border-neutral-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.position}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{candidate.email} | {candidate.phone}</div>
                                {candidate.note && <div className="text-xs text-gray-400 mt-1">{candidate.note}</div>}
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
                                    onClick={() => {
                                        setCVImgUrl(candidate.cvImg);
                                        setShowCVModal(true);
                                    }}
                                >
                                    View CV
                                </button>
                                <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                                    Mark as Contacted
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showCVModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-4 max-w-2xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                            onClick={() => setShowCVModal(false)}
                        >
                            &times;
                        </button>
                        <div className="text-lg font-semibold mb-3">Candidate CV</div>
                        <div className="flex justify-center">
                            <img
                                src={cvImgUrl}
                                alt="Candidate CV"
                                className="max-h-[70vh] rounded border"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
