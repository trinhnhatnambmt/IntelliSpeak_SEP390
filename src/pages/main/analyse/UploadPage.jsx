import { SquareChartGantt } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadResumeAPI } from "~/apis";
import FileUploader from "~/components/FileUploader";

const UploadPage = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");

    const handleFileSelect = (file) => {
        setFile(file);
    };

    const handleAnalyze = async ({ file, title }) => {
        setIsProcessing(true);

        const reqData = new FormData();
        reqData.append("file", file);
        // console.log("🚀 ~ handleAnalyze ~ reqData:", reqData);
        // for (const value of reqData.values()) {
        //     console.log("reqData Value: ", value);
        // }

        //Gọi API
        uploadResumeAPI(reqData, title).then((res) => {
            if (!res.error) {
                toast.success("Phân tích thành công");
            }
            navigate(`/resume/${res?.evaluation?.id}`);
        });
        setStatusText("Analyzing your CV...");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (!form) return;
        if (!file) return;
        handleAnalyze({ file, title });
    };

    return (
        <div>
            <section className="main-section">
                <div className="page-heading py-5">
                    <h1 className="text-6xl font-semibold">
                        Smart feedback for your dream job
                    </h1>
                    {isProcessing ? (
                        <>
                            <h2 className="text-2xl">{statusText}</h2>
                            <img
                                src="/images/resume-scan.gif"
                                className="mt-[-100px] w-[500px] relative z-10"
                            />
                        </>
                    ) : (
                        <h2 className="text-2xl font-medium text-shadow-gray-50">
                            Upload your resume to see your ATS score and get
                            improvement tips
                        </h2>
                    )}
                    {!isProcessing && (
                        <form
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <div className="form-div">
                                <label
                                    htmlFor="title"
                                    className="block text-gray-800 dark:text-white font-medium mb-1"
                                >
                                    Resume title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Frontend Developer Resume"
                                    required
                                    className="relative z-10 w-full bg-white dark:bg-[#0e0c15] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    file={file}
                                />
                            </div>

                            <button
                                type="submit"
                                className="relative z-10 cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                            >
                                <SquareChartGantt className="w-5 h-5" />
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default UploadPage;
