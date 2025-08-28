import { SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addJDForCompanyAPI, getJdCompanyOfHR } from "~/apis";
import FileUploader from "~/components/FileUploader";

export default function HRJDUploadTab() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState(null);
    const [jobDescriptions, setJobDescriptions] = useState([]);

    useEffect(() => {
        fetchJobDescriptions();
    }, []);

    const fetchJobDescriptions = () => {
        getJdCompanyOfHR().then((res) => {
            setJobDescriptions(res);
        });
    };

    const handleFileSelect = (file) => {
        setFile(file);
    };

    const handleAnalyze = async ({ file }) => {
        setIsProcessing(true);
        setStatusText("Uploading your JD...");

        const reqData = new FormData();
        reqData.append("file", file);

        addJDForCompanyAPI(reqData).then((res) => {
            if (!res.error) {
                toast.success("Uploading JD successfully!");
                setIsProcessing(false);
                setStatusText("");
                setFile(null);
                fetchJobDescriptions();
            } else {
                // Xử lý lỗi nếu cần
                setIsProcessing(false);
                setStatusText("");
                toast.error("Failed to upload JD.");
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        handleAnalyze({ file });
    };

    return (
        <div className="space-y-6">
            {isProcessing ? (
                <div className="mt-10">
                    <h2 className="text-2xl">{statusText}</h2>
                    <img
                        src="/images/resume-scan.gif"
                        className="mt-[-100px] w-[500px] ml-[180px] relative z-10"
                    />
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-medium text-shadow-gray-50">
                        Upload a Job Description (JD)
                    </h2>
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

                    {/* Phần hiển thị danh sách JD */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-medium mb-4">
                            Your Job Descriptions
                        </h2>
                        {jobDescriptions.length === 0 ? (
                            <p>No job descriptions available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobDescriptions.map((jd) => {
                                    // Lấy link ảnh đầu tiên từ linkToJd (nếu có nhiều trang, tách bằng ';')
                                    const firstImageLink = jd.linkToJd
                                        .split(";")[0]
                                        .trim();
                                    return (
                                        <a
                                            key={jd.companyJdId}
                                            href={firstImageLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                                        >
                                            <img
                                                src={firstImageLink}
                                                alt={jd.jobTitle}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold">
                                                    {jd.jobTitle}
                                                </h3>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
