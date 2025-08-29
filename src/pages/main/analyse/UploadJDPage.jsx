import { SquareChartGantt } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadJdAPI } from "~/apis";
import FileUploader from "~/components/FileUploader";

const UploadJDPage = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState(null);

    const handleFileSelect = (file) => {
        setFile(file);
    };

    const handleAnalyze = async ({ file }) => {
        setIsProcessing(true);
        setStatusText("Analyzing your JD...");

        const reqData = new FormData();
        reqData.append("file", file);

        //Gọi API
        uploadJdAPI(reqData).then((res) => {
            if (!res.error) {
                toast.success("Analyze JD successfully!");
                navigate(`/jd/${res?.jdId}`);
            } else {
                toast.error(
                    "Failed to analyze JD. Redirecting to main page..."
                );
                navigate("/main");
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (!form) return;
        if (!file) return;
        handleAnalyze({ file });
    };

    return (
        <div>
            <section className="main-section">
                <div className="page-heading py-5">
                    <h1 className="text-6xl font-semibold">
                        Analyze Job Descriptions to discover the best-fit roles
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
                            Upload a Job Description (JD) to receive detailed
                            analysis and personalized recommendations
                        </h2>
                    )}
                    {!isProcessing && (
                        <form
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <div className="form-div">
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
                                Analyze JD
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default UploadJDPage;
