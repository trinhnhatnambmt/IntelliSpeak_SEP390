import React, { useState } from "react";

export default function HRJDUploadTab() {
    const [jdName, setJDName] = useState("");
    const [jdDesc, setJDDesc] = useState("");
    const [jdFile, setJDFile] = useState(null);
    const [jdList, setJDList] = useState([
        // Demo data
        // { name: "JD Frontend Developer", desc: "React, HTML, CSS", fileName: "JD_Frontend.pdf" }
    ]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setJDFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!jdName || !jdFile) {
            alert("Please enter JD name and select a file.");
            return;
        }
        setUploading(true);
        // Fake upload
        setTimeout(() => {
            setJDList([
                ...jdList,
                {
                    name: jdName,
                    desc: jdDesc,
                    fileName: jdFile.name,
                },
            ]);
            setJDName("");
            setJDDesc("");
            setJDFile(null);
            setUploading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Upload Job Description (JD)</h3>
            <form
                className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 flex flex-col gap-4"
                onSubmit={handleUpload}
            >
                <div>
                    <label className="block font-medium mb-1">JD Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md dark:bg-neutral-900 dark:border-neutral-700"
                        value={jdName}
                        onChange={e => setJDName(e.target.value)}
                        placeholder="e.g. Backend Developer"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Short Description</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md dark:bg-neutral-900 dark:border-neutral-700"
                        value={jdDesc}
                        onChange={e => setJDDesc(e.target.value)}
                        placeholder="e.g. NodeJS, MongoDB, REST API"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">JD File <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="block"
                        required
                    />
                    {jdFile && (
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            Selected: {jdFile.name}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-60"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload JD"}
                </button>
            </form>
            <div>
                <h4 className="font-semibold mb-2">Uploaded JDs</h4>
                {jdList.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400">No JD uploaded yet.</div>
                ) : (
                    <ul className="space-y-2">
                        {jdList.map((jd, idx) => (
                            <li key={idx} className="p-3 border rounded-md bg-white dark:bg-neutral-900 dark:border-neutral-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                    <div className="font-medium">{jd.name}</div>
                                    {jd.desc && <div className="text-sm text-gray-500 dark:text-gray-400">{jd.desc}</div>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">{jd.fileName}</span>
                                    <button className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
