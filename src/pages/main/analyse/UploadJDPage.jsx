import { Progress } from "antd";
import { SquareChartGantt } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadJdAPI } from "~/apis";
import FileUploader from "~/components/FileUploader";

const UploadJDPage = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    const handleFileSelect = (file) => {
        setFile(file);
    };

    const handleAnalyze = async ({ file }) => {
        setIsProcessing(true);

        const reqData = new FormData();
        reqData.append("file", file);

        let fakeProgress = 0;
        const interval = setInterval(() => {
            fakeProgress += Math.floor(Math.random() * 15) + 5;
            if (fakeProgress >= 95) {
                fakeProgress = 95;
                clearInterval(interval);
            }
            setProgress(fakeProgress);
        }, 500);

        //Gọi API
        uploadJdAPI(reqData)
            .then((res) => {
                clearInterval(interval);
                setProgress(100);

                if (!res.error) {
                    toast.success("Analyze JD successfully!");
                    navigate(`/jd/${res?.jdId}`);
                } else {
                    toast.error(
                        "Failed to analyze JD. Redirecting to main page..."
                    );
                    navigate("/main");
                }
            })
            .catch((error) => {
                clearInterval(interval);
                setProgress(0);
                navigate("/main/analyze/JD");
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
                            <div className="flex flex-col items-center mt-6">
                                <Progress
                                    percent={progress}
                                    percentPosition={{
                                        align: "center",
                                        type: "inner",
                                    }}
                                    size={[700, 20]}
                                    strokeColor={{
                                        "0%": "#108ee9",
                                        "100%": "#87d068",
                                    }}
                                />
                            </div>
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
